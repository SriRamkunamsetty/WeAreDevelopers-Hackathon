/**
 * Model Context Protocol (MCP) Security Gateway & JSON-RPC 2.0 Inspector
 * Validates, sandboxes, and inspects tool call invocations following the Anthropic MCP specification.
 */

import { inspectCommand } from "../policy-engine/command-firewall";
import { inspectNetworkRequest } from "../policy-engine/network-acl";
import { scrubSecrets } from "../policy-engine/secret-scrubber";
import { PolicyVerdict } from "../types";

export interface McpJsonRpcRequest {
  readonly jsonrpc: "2.0";
  readonly id: string | number;
  readonly method: "tools/call" | "resources/read" | "prompts/get" | "tools/list";
  readonly params?: {
    readonly name?: string;
    readonly arguments?: Record<string, unknown>;
    readonly uri?: string;
  };
}

export interface McpInspectionResult {
  readonly isValidJsonRpc: boolean;
  readonly toolName: string;
  readonly verdict: PolicyVerdict;
  readonly sanitizedArguments: Record<string, unknown>;
  readonly securityAlerts: readonly string[];
  readonly payloadChecksum: string;
  readonly latencyMs: number;
}

/**
 * Inspects and sanitizes an incoming Model Context Protocol (MCP) tool invocation
 */
export function inspectMcpRequest(request: McpJsonRpcRequest): McpInspectionResult {
  const start = performance.now();
  const alerts: string[] = [];
  const toolName = request.params?.name || "unknown_tool";
  const rawArgs = request.params?.arguments || {};
  const sanitizedArgs: Record<string, unknown> = {};

  let verdict: PolicyVerdict = {
    allowed: true,
    action: "ALLOW",
    ruleId: "MCP-GATEWAY-CLEAR",
    ruleName: "MCP Tool Parameter Clearance",
    reason: "Tool invocation satisfies MCP enterprise security boundaries.",
    blockedPatterns: [],
  };

  // 1. Inspect Shell / Execution Tools (e.g. "execute_command", "bash", "terminal")
  if (/command|bash|shell|exec/i.test(toolName)) {
    const cmd = String(rawArgs["command"] || rawArgs["cmd"] || "");
    const cmdVerdict = inspectCommand(cmd);
    if (!cmdVerdict.allowed) {
      verdict = cmdVerdict;
      alerts.push(`Critical: Blocked command in MCP tool "${toolName}": ${cmdVerdict.reason}`);
    }
  }

  // 2. Inspect Network / Web Tools (e.g. "fetch", "http_request", "curl")
  if (/fetch|http|web|network|request/i.test(toolName)) {
    const url = String(rawArgs["url"] || rawArgs["target"] || "");
    const netVerdict = inspectNetworkRequest(url);
    if (!netVerdict.allowed) {
      verdict = netVerdict;
      alerts.push(`Security Alert: Blocked network request in MCP tool "${toolName}": ${netVerdict.reason}`);
    }
  }

  // 3. Inspect Filesystem Tools (e.g. "read_file", "write_file")
  if (/file|fs|write|read/i.test(toolName)) {
    const path = String(rawArgs["path"] || rawArgs["filePath"] || "");
    if (/\.\.\/|\.\.\\|\/etc\/|\/root|\/windows\/system32/i.test(path)) {
      verdict = {
        allowed: false,
        action: "BLOCK",
        ruleId: "MCP-FS-TRAVERSAL",
        ruleName: "Filesystem Path Traversal Violation",
        reason: "Access beyond project sandbox directory boundary is forbidden.",
        blockedPatterns: [path],
      };
      alerts.push(`Path Traversal: Blocked unauthorized directory access: "${path}"`);
    }
  }

  // 4. Secret Scrubbing on all argument string values
  for (const [key, value] of Object.entries(rawArgs)) {
    if (typeof value === "string") {
      const scrub = scrubSecrets(value);
      if (scrub.redactedCount > 0) {
        alerts.push(`Credential Shield: Scrubbed ${scrub.redactedCount} secret(s) from parameter "${key}"`);
      }
      sanitizedArgs[key] = scrub.sanitized;
    } else {
      sanitizedArgs[key] = value;
    }
  }

  // Simple checksum for visual tamper verification
  const payloadStr = JSON.stringify({ method: request.method, name: toolName, args: sanitizedArgs });
  let check = 0;
  for (let i = 0; i < payloadStr.length; i++) {
    check = (check + payloadStr.charCodeAt(i) * 31) & 0xffffff;
  }
  const payloadChecksum = `0x${check.toString(16).padStart(6, "0").toUpperCase()}`;
  const latencyMs = Number((performance.now() - start).toFixed(2));

  return {
    isValidJsonRpc: request.jsonrpc === "2.0",
    toolName,
    verdict,
    sanitizedArguments: sanitizedArgs,
    securityAlerts: alerts,
    payloadChecksum,
    latencyMs,
  };
}
