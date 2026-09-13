import { CweVulnerability, ScanResult, SeverityLevel } from "../types";

interface CweRule {
  readonly cweId: "CWE-89" | "CWE-798" | "CWE-79" | "CWE-918" | "CWE-22" | "CWE-78";
  readonly title: string;
  readonly severity: SeverityLevel;
  readonly description: string;
  readonly regex: RegExp;
  readonly remediationAdvice: string;
}

const CWE_RULES: readonly CweRule[] = [
  {
    cweId: "CWE-89",
    title: "SQL Injection via String Concatenation",
    severity: "CRITICAL",
    description: "User input directly interpolated into SQL query without parameterized statements or prepared queries.",
    regex: /(?:query|execute|raw)\s*\(\s*`[^`]*\$\{[^}]+\}[^`]*`\s*\)|(?:query|execute)\s*\(\s*["'][^"']*\s*(\+|%)\s*[a-zA-Z0-9_.]+/i,
    remediationAdvice: "Replace dynamic string interpolation with parameterized queries ($1, ? markers) or a type-safe ORM query builder.",
  },
  {
    cweId: "CWE-798",
    title: "Hardcoded Cryptographic Key or API Secret",
    severity: "CRITICAL",
    description: "Sensitive credential or access token embedded directly in source code.",
    regex: /(?:const|let|var|apiKey|api_key|secret|password|token)\s*[:=]\s*["'](?:sk-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9_]{36}|postgres:\/\/[^"']+)["']/i,
    remediationAdvice: "Extract secrets to environment variables via process.env and validate using a strict configuration schema.",
  },
  {
    cweId: "CWE-79",
    title: "Improper Neutralization of Input During Web Page Generation (XSS)",
    severity: "HIGH",
    description: "Direct insertion of untrusted data into DOM via dangerouslySetInnerHTML or innerHTML.",
    regex: /dangerouslySetInnerHTML\s*=\s*\{\s*\{\s*__html\s*:[^}]+DOMPurify\.sanitize/i, // Negative lookahead handled in scan logic
    remediationAdvice: "Avoid dangerouslySetInnerHTML or pass through DOMPurify.sanitize() to ensure markup is sanitized.",
  },
  {
    cweId: "CWE-22",
    title: "Improper Limitation of a Pathname to a Restricted Directory (Path Traversal)",
    severity: "HIGH",
    description: "Direct file path construction using unsanitized user parameter without path.basename or directory boundary checks.",
    regex: /path\.(?:join|resolve)\s*\([^)]*(?:req\.params|req\.query|req\.body|userInput)[^)]*\)/i,
    remediationAdvice: "Sanitize filenames using path.basename() and verify that the resolved path is within the designated root directory.",
  },
  {
    cweId: "CWE-918",
    title: "Server-Side Request Forgery (SSRF)",
    severity: "HIGH",
    description: "Network request sent to an unvalidated URL provided by external user input.",
    regex: /(?:fetch|axios(?:\.get|\.post)?|http\.get)\s*\(\s*(?:req\.query\.|req\.body\.|params\.)[a-zA-Z0-9_.]+\s*[,)]/i,
    remediationAdvice: "Validate external destination URLs against a strict allow-list of domains and block internal IP ranges.",
  },
  {
    cweId: "CWE-78",
    title: "Improper Neutralization of Special Elements used in an OS Command (Command Injection)",
    severity: "CRITICAL",
    description: "Executing system shell commands with concatenated unsanitized parameters.",
    regex: /(?:child_process|exec|execSync)\s*\(\s*(?:`[^`]*\$\{[^}]+\}[^`]*`|["'][^"']*\s*\+\s*[a-zA-Z0-9_.]+)/i,
    remediationAdvice: "Avoid shell string execution. Use execFile or spawn with an explicit arguments array and strict validation.",
  },
];

/**
 * Scans code for common CWE security vulnerabilities
 */
export function scanCodeForVulnerabilities(
  code: string,
  language: "typescript" | "javascript" | "python" | "sql" = "typescript"
): ScanResult {
  const lines = code.split("\n");
  const vulnerabilities: CweVulnerability[] = [];

  // Check each line or sliding window
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || "";
    const lineNumber = i + 1;

    // Check specific CWE rules
    for (const rule of CWE_RULES) {
      // Special handling for XSS (check if dangerouslySetInnerHTML without DOMPurify)
      if (rule.cweId === "CWE-79") {
        if (/dangerouslySetInnerHTML/i.test(line) && !/DOMPurify/i.test(line)) {
          vulnerabilities.push({
            id: `VULN-${Date.now()}-${vulnerabilities.length + 1}`,
            cweId: rule.cweId,
            title: rule.title,
            severity: rule.severity,
            description: rule.description,
            lineStart: lineNumber,
            lineEnd: lineNumber,
            snippet: line.trim(),
            remediation: rule.remediationAdvice,
            safeCodeReplacement: line.replace(
              /dangerouslySetInnerHTML=\{\{\s*__html:\s*([^}]+)\s*\}\}/,
              "dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize($1) }}"
            ),
          });
        }
        continue;
      }

      if (rule.regex.test(line)) {
        vulnerabilities.push({
          id: `VULN-${Date.now()}-${vulnerabilities.length + 1}`,
          cweId: rule.cweId,
          title: rule.title,
          severity: rule.severity,
          description: rule.description,
          lineStart: lineNumber,
          lineEnd: lineNumber,
          snippet: line.trim(),
          remediation: rule.remediationAdvice,
        });
      }
    }
  }

  // Cross-line SQL injection check (for multi-line queries)
  if (!vulnerabilities.some((v) => v.cweId === "CWE-89")) {
    const sqliMultiline = /(?:SELECT|INSERT|UPDATE|DELETE)[^;]*\$\{[^}]+\}/i;
    const match = sqliMultiline.exec(code);
    if (match) {
      const startLine = code.substring(0, match.index).split("\n").length;
      vulnerabilities.push({
        id: `VULN-${Date.now()}-${vulnerabilities.length + 1}`,
        cweId: "CWE-89",
        title: "SQL Injection via Multi-line Interpolation",
        severity: "CRITICAL",
        description: "Dynamic string interpolation inside a SQL query statement.",
        lineStart: startLine,
        lineEnd: startLine + 1,
        snippet: match[0].trim().substring(0, 120),
        remediation: "Use parameterized queries with prepared placeholders.",
      });
    }
  }

  const criticalCount = vulnerabilities.filter((v) => v.severity === "CRITICAL").length;
  const highCount = vulnerabilities.filter((v) => v.severity === "HIGH").length;
  const mediumCount = vulnerabilities.filter((v) => v.severity === "MEDIUM").length;
  const isSecure = vulnerabilities.length === 0;

  // Generate remediation instruction prompt for agent self-healing
  let remediationPrompt: string | undefined;
  if (!isSecure) {
    const issuesSummary = vulnerabilities
      .map((v) => `- [${v.cweId}] ${v.title} at line ${v.lineStart}: ${v.remediation}`)
      .join("\n");

    remediationPrompt = `[AEGIS_SECURITY_FIREWALL_ALERT]
Your proposed code modification failed automated security compliance gates.
Found ${vulnerabilities.length} active vulnerabilities:
${issuesSummary}

Please rewrite the code snippet to strictly resolve all listed CWE vulnerabilities.
Requirements:
1. Use parameterized queries for all database access.
2. Store secrets in process.env with fallback validations.
3. Validate and sanitize any file path or user URL before invocation.`;
  }

  return {
    scanId: `scan_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    language,
    isSecure,
    totalFindings: vulnerabilities.length,
    criticalCount,
    highCount,
    mediumCount,
    vulnerabilities,
    remediationPrompt,
  };
}
