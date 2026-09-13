import { NextResponse } from "next/server";
import { z } from "zod";
import { calculatePri } from "@/lib/eval-engine/pri-calculator";
import { scanCodeForVulnerabilities } from "@/lib/ast-scanner/cwe-scanner";
import { TrajectoryStep } from "@/lib/types";

const EvaluateRequestSchema = z.object({
  code: z.string().min(1, "Code is required"),
  language: z.enum(["typescript", "javascript", "python", "sql"]).default("typescript"),
  trajectory: z.array(z.any()).default([]),
  totalExecutionMs: z.number().default(1200),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parseResult = EvaluateRequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid evaluation payload",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { code, language, trajectory, totalExecutionMs } = parseResult.data;
    const scanResult = scanCodeForVulnerabilities(code, language);

    const pri = calculatePri({
      scanResult,
      trajectory: trajectory as readonly TrajectoryStep[],
      totalExecutionMs,
    });

    return NextResponse.json(
      {
        scanResult,
        pri,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AEGIS_EVAL_ERROR]:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Internal evaluation pipeline error" },
      { status: 500 }
    );
  }
}
