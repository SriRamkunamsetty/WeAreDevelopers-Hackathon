import { NextResponse } from "next/server";
import { z } from "zod";
import { scanCodeForVulnerabilities } from "@/lib/ast-scanner/cwe-scanner";

const ScanRequestSchema = z.object({
  code: z.string().min(1, "Code content is required").max(100000, "Code exceeds maximum size limit"),
  language: z.enum(["typescript", "javascript", "python", "sql"]).optional().default("typescript"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parseResult = ScanRequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { code, language } = parseResult.data;
    const result = scanCodeForVulnerabilities(code, language);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Log detailed diagnostics securely on server, generic message to client
    console.error("[AEGIS_SCAN_ERROR]:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Internal code analysis scan error" },
      { status: 500 }
    );
  }
}
