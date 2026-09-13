import { PolicyVerdict } from "../types";

const BLOCKED_IP_RANGES = [
  /^127\.\d+\.\d+\.\d+$/,          // Loopback
  /^10\.\d+\.\d+\.\d+$/,           // Private class A
  /^192\.168\.\d+\.\d+$/,          // Private class C
  /^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/, // Private class B
  /^169\.254\.\d+\.\d+$/,          // Link-local / AWS metadata
  /^localhost$/i,
  /^0\.0\.0\.0$/,
];

const TRUSTED_DOMAINS = [
  "api.github.com",
  "github.com",
  "registry.npmjs.org",
  "pypi.org",
  "files.pythonhosted.org",
  "crates.io",
  "api.anthropic.com",
  "api.openai.com",
  "generativelanguage.googleapis.com",
  "huggingface.co",
];

/**
 * Validates an outbound URL to prevent SSRF and unauthorized network egress
 */
export function inspectNetworkRequest(rawUrl: string): PolicyVerdict {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return {
      allowed: false,
      action: "BLOCK",
      ruleId: "AEGIS-NET-001",
      ruleName: "Malformed URL Request",
      reason: `The requested target "${rawUrl}" is not a valid standard URL.`,
      blockedPatterns: [rawUrl],
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Check SSRF blocked IP/hostnames
  for (const blocked of BLOCKED_IP_RANGES) {
    if (blocked.test(hostname)) {
      return {
        allowed: false,
        action: "BLOCK",
        ruleId: "AEGIS-NET-SSRF-001",
        ruleName: "SSRF Internal Network Boundary Violation",
        reason: `Target hostname "${hostname}" resolves to internal private or cloud metadata network.`,
        blockedPatterns: [hostname],
      };
    }
  }

  // Check protocol
  if (parsed.protocol !== "https:") {
    return {
      allowed: false,
      action: "BLOCK",
      ruleId: "AEGIS-NET-TLS-001",
      ruleName: "Insecure Plaintext HTTP Protocol",
      reason: `Target "${rawUrl}" uses unencrypted ${parsed.protocol} instead of required https.`,
      blockedPatterns: [parsed.protocol],
    };
  }

  // Check if domain is trusted or external
  const isTrusted = TRUSTED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );

  if (!isTrusted) {
    return {
      allowed: true,
      action: "WARN",
      ruleId: "AEGIS-NET-EXTERNAL",
      ruleName: "Untrusted Outbound Destination",
      reason: `Outbound request to third-party domain "${hostname}" flagged for audit telemetry.`,
      blockedPatterns: [],
    };
  }

  return {
    allowed: true,
    action: "ALLOW",
    ruleId: "AEGIS-NET-SAFE",
    ruleName: "Approved Domain",
    reason: "Destination matches trusted developer registry/API allow-list.",
    blockedPatterns: [],
  };
}
