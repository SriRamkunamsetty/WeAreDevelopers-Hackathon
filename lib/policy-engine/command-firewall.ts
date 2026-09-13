import { PolicyVerdict } from "../types";

interface DangerousPattern {
  readonly id: string;
  readonly name: string;
  readonly regex: RegExp;
  readonly severity: "CRITICAL" | "HIGH" | "MEDIUM";
  readonly description: string;
}

const DANGEROUS_COMMAND_RULES: readonly DangerousPattern[] = [
  {
    id: "AEGIS-CMD-001",
    name: "Destructive Root / Broad Directory Deletion",
    regex: /(?:rm\s+-[a-zA-Z]*r[a-zA-Z]*f\s+[\/\*~]|rm\s+-[a-zA-Z]*f[a-zA-Z]*r\s+[\/\*~]|rmdir\s+\/s\s+\/q)/i,
    severity: "CRITICAL",
    description: "Detected attempt to recursively delete critical system or root directories.",
  },
  {
    id: "AEGIS-CMD-002",
    name: "Remote Code Pipe to Shell (Curl/Wget to Bash)",
    regex: /(?:curl|wget|fetch)\s+[^\n|&;]+\|\s*(?:ba|z)?sh/i,
    severity: "CRITICAL",
    description: "Piping untrusted remote scripts directly into a shell interpreter is strictly prohibited.",
  },
  {
    id: "AEGIS-CMD-003",
    name: "System Credential / Shadow Access",
    regex: /(?:cat|head|tail|grep|strings|view)\s+(?:\/etc\/(?:shadow|passwd|master\.passwd)|\/windows\/system32\/config)/i,
    severity: "CRITICAL",
    description: "Unauthorized inspection of system credential databases or SAM registry.",
  },
  {
    id: "AEGIS-CMD-004",
    name: "Mass Environment / Secret Dump to Disk",
    regex: /(?:printenv|env|export)\s*>\s*[^\n|&;]+/i,
    severity: "HIGH",
    description: "Exporting raw environment variables containing secrets into persistent files.",
  },
  {
    id: "AEGIS-CMD-005",
    name: "Reverse Shell / Uncontained Netcat Listener",
    regex: /(?:nc\s+-[a-zA-Z]*e\s+|bash\s+-i\s+>&|\/dev\/tcp\/|socat\s+exec:)/i,
    severity: "CRITICAL",
    description: "Attempted creation of interactive reverse shell session.",
  },
  {
    id: "AEGIS-CMD-006",
    name: "Uncontained Fork Bomb",
    regex: /:\(\)\s*\{\s*:\|:&\s*\};:/i,
    severity: "CRITICAL",
    description: "Denial of service attempt through recursive shell process multiplication.",
  },
  {
    id: "AEGIS-CMD-007",
    name: "Unauthorized Tunneling Tool",
    regex: /(?:ngrok\s+http|cloudflared\s+tunnel|localtunnel|bore\s+local)/i,
    severity: "HIGH",
    description: "Tunneling local ports through public proxies bypasses enterprise security perimeters.",
  },
];

/**
 * Inspects a shell command against enterprise runtime policies
 */
export function inspectCommand(rawCommand: string): PolicyVerdict {
  const normalized = rawCommand.trim();

  for (const rule of DANGEROUS_COMMAND_RULES) {
    if (rule.regex.test(normalized)) {
      return {
        allowed: false,
        action: "BLOCK",
        ruleId: rule.id,
        ruleName: rule.name,
        reason: rule.description,
        blockedPatterns: [rule.regex.source],
      };
    }
  }

  // Suspicious directory traversal or chmod 777
  if (/chmod\s+(?:-R\s+)?777/i.test(normalized)) {
    return {
      allowed: true,
      action: "WARN",
      ruleId: "AEGIS-CMD-WARN-001",
      ruleName: "Overly Permissive File Mode",
      reason: "Granting world-writable chmod 777 permissions is against least-privilege principles.",
      blockedPatterns: ["chmod 777"],
    };
  }

  return {
    allowed: true,
    action: "ALLOW",
    ruleId: "AEGIS-CMD-SAFE",
    ruleName: "Sandbox Permitted",
    reason: "Command complies with runtime policy standards.",
    blockedPatterns: [],
  };
}
