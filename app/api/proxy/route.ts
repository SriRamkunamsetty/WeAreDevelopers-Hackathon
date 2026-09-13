import { NextResponse } from "next/server";
import { z } from "zod";
import { inspectCommand } from "@/lib/policy-engine/command-firewall";
import { inspectNetworkRequest } from "@/lib/policy-engine/network-acl";
import { scrubSecrets } from "@/lib/policy-engine/secret-scrubber";
import { PolicyVerdict } from "@/lib/types";

const ProxyRequestSchema = z.object({
  toolName: z.enum(["bash", "file_write", "file_edit", "network_fetch", "database_query"]),
  command: z.string().optional(),
  url: z.string().optional(),
  payload: z.string().optional(),
});

export async function POST(request: Request) {
  const startHr = process.hrtime();

  try {
    const json = await request.json();
    const parseResult = ProxyRequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid tool invocation payload",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { toolName, command, url, payload } = parseResult.data;
    let verdict: PolicyVerdict = {
      allowed: true,
      action: "ALLOW",
      ruleId: "AEGIS-DEFAULT",
      ruleName: "Standard Tool Gate",
      reason: "Execution permitted under default sandbox policy.",
      blockedPatterns: [],
    };

    // 1. Inspect Shell Commands
    if (toolName === "bash" && command) {
      verdict = inspectCommand(command);
    }

    // 2. Inspect Network Outbound
    if (toolName === "network_fetch" && url) {
      verdict = inspectNetworkRequest(url);
    }

    // 3. Secret Scrubbing on input/output
    const scrubResult = scrubSecrets(payload || command || "");

    const elapsedHr = process.hrtime(startHr);
    const latencyMs = Number((elapsedHr[0] * 1000 + elapsedHr[1] / 1e6).toFixed(2));

    return NextResponse.json(
      {
        verdict,
        redactedSecretsCount: scrubResult.redactedCount,
        matchedSecretTypes: scrubResult.matchedTypes,
        sanitizedPayload: scrubResult.sanitized,
        gatewayLatencyMs: latencyMs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AEGIS_PROXY_ERROR]:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Runtime gateway execution error" },
      { status: 500 }
    );
  }
}
