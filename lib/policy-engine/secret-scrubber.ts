interface SecretPattern {
  readonly name: string;
  readonly regex: RegExp;
  readonly replacement: string;
}

const SECRET_PATTERNS: readonly SecretPattern[] = [
  {
    name: "AWS Access Key",
    regex: /\b(AKIA[0-9A-Z]{16})\b/g,
    replacement: "[REDACTED_AWS_KEY]",
  },
  {
    name: "AWS Secret Access Key",
    regex: /(aws_secret_access_key\s*=\s*['"]?)[A-Za-z0-9\/+=]{40}(['"]?)/gi,
    replacement: "$1[REDACTED_AWS_SECRET]$2",
  },
  {
    name: "GitHub Personal Access Token",
    regex: /\b(ghp_[A-Za-z0-9_]{36,255}|github_pat_[A-Za-z0-9_]{82})\b/g,
    replacement: "[REDACTED_GITHUB_PAT]",
  },
  {
    name: "OpenAI API Key",
    regex: /\b(sk-[a-zA-Z0-9]{20,64}T3BlbkFJ[a-zA-Z0-9]{20,64}|sk-proj-[a-zA-Z0-9_-]{48,128})\b/g,
    replacement: "[REDACTED_OPENAI_KEY]",
  },
  {
    name: "Anthropic API Key",
    regex: /\b(sk-ant-[a-zA-Z0-9_-]{40,100})\b/g,
    replacement: "[REDACTED_ANTHROPIC_KEY]",
  },
  {
    name: "Google Gemini / Cloud API Key",
    regex: /\b(AIza[0-9A-Za-z-_]{35})\b/g,
    replacement: "[REDACTED_GOOGLE_API_KEY]",
  },
  {
    name: "Generic JWT Bearer Token",
    regex: /\b(eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})\b/g,
    replacement: "[REDACTED_JWT_TOKEN]",
  },
  {
    name: "Private Key Header",
    regex: /-----BEGIN\s+(?:RSA|OPENSSH|DSA|EC|PGP)?\s*PRIVATE\s+KEY-----[\s\S]*?-----END\s+(?:RSA|OPENSSH|DSA|EC|PGP)?\s*PRIVATE\s+KEY-----/g,
    replacement: "[REDACTED_PRIVATE_KEY_BLOCK]",
  },
];

/**
 * Scans text and redacts credentials before returning content to agents or logs
 */
export function scrubSecrets(input: string): { sanitized: string; redactedCount: number; matchedTypes: string[] } {
  let sanitized = input;
  let redactedCount = 0;
  const matchedTypes: string[] = [];

  for (const pattern of SECRET_PATTERNS) {
    const matches = sanitized.match(pattern.regex);
    if (matches && matches.length > 0) {
      redactedCount += matches.length;
      matchedTypes.push(pattern.name);
      sanitized = sanitized.replace(pattern.regex, pattern.replacement);
    }
  }

  return {
    sanitized,
    redactedCount,
    matchedTypes,
  };
}
