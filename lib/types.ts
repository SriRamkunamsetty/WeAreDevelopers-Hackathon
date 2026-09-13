/**
 * AegisAgent Core Domain Types & Schemas
 * Following Google TypeScript Style Guide:
 * - Strict type-safety
 * - Explicit interfaces and read-only properties
 * - Comprehensive JSDoc documentation
 */

export type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

export type PolicyAction = "ALLOW" | "BLOCK" | "REMEDIATE" | "WARN";

export type AgentStatus = "IDLE" | "ANALYZING" | "INTERCEPTING" | "SCANNING" | "REMEDIATING" | "PASSED" | "FAILED";

/**
 * Common CWE Security Vulnerabilities identified in AI-generated code
 */
export interface CweVulnerability {
  readonly id: string;
  readonly cweId: "CWE-89" | "CWE-798" | "CWE-79" | "CWE-918" | "CWE-22" | "CWE-78";
  readonly title: string;
  readonly severity: SeverityLevel;
  readonly description: string;
  readonly lineStart: number;
  readonly lineEnd: number;
  readonly snippet: string;
  readonly remediation: string;
  readonly safeCodeReplacement?: string;
}

/**
 * Result of the AST Code Security Scan
 */
export interface ScanResult {
  readonly scanId: string;
  readonly timestamp: string;
  readonly language: "typescript" | "javascript" | "python" | "sql";
  readonly isSecure: boolean;
  readonly totalFindings: number;
  readonly criticalCount: number;
  readonly highCount: number;
  readonly mediumCount: number;
  readonly vulnerabilities: readonly CweVulnerability[];
  readonly remediationPrompt?: string;
  readonly remediatedCode?: string;
}

/**
 * Intercepted Tool Call from an AI Agent
 */
export interface ToolInvocation {
  readonly toolName: "bash" | "file_write" | "file_edit" | "network_fetch" | "database_query";
  readonly parameters: Record<string, unknown>;
  readonly rawCommand?: string;
  readonly targetPath?: string;
  readonly targetUrl?: string;
}

/**
 * Policy Inspection Verdict
 */
export interface PolicyVerdict {
  readonly allowed: boolean;
  readonly action: PolicyAction;
  readonly ruleId: string;
  readonly ruleName: string;
  readonly reason: string;
  readonly sanitizedInput?: Record<string, unknown>;
  readonly blockedPatterns: readonly string[];
}

/**
 * Trajectory Step in an Agent Execution
 */
export interface TrajectoryStep {
  readonly stepNumber: number;
  readonly timestamp: string;
  readonly phase: "THOUGHT" | "TOOL_REQUEST" | "AEGIS_GATEWAY" | "EXECUTION" | "VERDICT";
  readonly title: string;
  readonly content: string;
  readonly toolInvocation?: ToolInvocation;
  readonly verdict?: PolicyVerdict;
  readonly scanResult?: ScanResult;
  readonly latencyMs: number;
  readonly tokenCost: number;
}

/**
 * Production Readiness Index (PRI) Metrics
 */
export interface ProductionReadinessIndex {
  readonly overallScore: number; // 0 to 100%
  readonly securityScore: number;
  readonly reliabilityScore: number;
  readonly latencyScore: number;
  readonly contractAdherenceScore: number;
  readonly recommendation: "APPROVED_FOR_PROD" | "REQUIRES_HUMAN_REVIEW" | "REJECTED_DANGEROUS";
  readonly summary: string;
}

/**
 * Live Hackathon Test Scenario
 */
export interface DemoScenario {
  readonly id: string;
  readonly title: string;
  readonly badge: string;
  readonly headline: string;
  readonly description: string;
  readonly userPrompt: string;
  readonly simulatedAgent: string;
  readonly rawVulnerableCode: string;
  readonly hardenedCode: string;
  readonly trajectory: readonly TrajectoryStep[];
  readonly scanResult: ScanResult;
  readonly pri: ProductionReadinessIndex;
}

/**
 * System Statistics for Dashboard
 */
export interface ControlPlaneStats {
  readonly totalAgentCalls: number;
  readonly blockedAttacks: number;
  readonly vulnerabilitiesFixed: number;
  readonly avgGatewayLatencyMs: number;
  readonly enterpriseTrustScore: number;
}
