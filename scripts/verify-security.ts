import { scanCodeForVulnerabilities } from "../lib/ast-scanner/cwe-scanner";
import { inspectCommand } from "../lib/policy-engine/command-firewall";
import { inspectNetworkRequest } from "../lib/policy-engine/network-acl";
import { scrubSecrets } from "../lib/policy-engine/secret-scrubber";
import { calculatePri } from "../lib/eval-engine/pri-calculator";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

console.log("=== AEGISAGENT AUTOMATED SECURITY VERIFICATION SUITE ===\n");

// 1. Test SQL Injection Detection (CWE-89)
const sqliCode = "const q = `SELECT * FROM users WHERE id = '${userId}'`;";
const sqliScan = scanCodeForVulnerabilities(sqliCode, "typescript");
assert(!sqliScan.isSecure, "Vulnerable SQL template must fail security scan");
assert(sqliScan.vulnerabilities.some(v => v.cweId === "CWE-89"), "Must identify CWE-89 SQL Injection");
assert(sqliScan.criticalCount === 1, "Must classify SQL injection as CRITICAL");

// 2. Test Hardcoded Secret Detection (CWE-798)
const secretCode = "const apiKey = 'sk-proj-999999999999999999999999999999999999999999999999';";
const secretScan = scanCodeForVulnerabilities(secretCode, "typescript");
assert(!secretScan.isSecure, "Hardcoded secret must fail security scan");
assert(secretScan.vulnerabilities.some(v => v.cweId === "CWE-798"), "Must identify CWE-798 Hardcoded Key");

// 3. Test Safe Parameterized Code (Clean Pass)
const safeCode = "const q = 'SELECT * FROM users WHERE id = $1'; const res = await db.query(q, [userId]);";
const safeScan = scanCodeForVulnerabilities(safeCode, "typescript");
assert(safeScan.isSecure, "Parameterized query must pass security scan with 0 findings");
assert(safeScan.totalFindings === 0, "Total findings must be 0 for safe code");

// 4. Test Shell Command Interceptor
const dangerousCmd = "rm -rf / --no-preserve-root";
const cmdVerdict = inspectCommand(dangerousCmd);
assert(!cmdVerdict.allowed, "Destructive rm -rf / command must be BLOCKED");
assert(cmdVerdict.action === "BLOCK", "Verdict action must be BLOCK");
assert(cmdVerdict.ruleId === "AEGIS-CMD-001", "Must trigger AEGIS-CMD-001");

const safeCmd = "npm run test:ci";
const safeCmdVerdict = inspectCommand(safeCmd);
assert(safeCmdVerdict.allowed, "Standard npm test command must be ALLOWED");

// 5. Test SSRF Network Boundary Enforcement
const ssrfUrl = "http://169.254.169.254/latest/meta-data/";
const ssrfVerdict = inspectNetworkRequest(ssrfUrl);
assert(!ssrfVerdict.allowed, "Cloud metadata 169.254.169.254 must be BLOCKED (SSRF)");

const safeUrl = "https://api.github.com/repos/org/repo";
const safeUrlVerdict = inspectNetworkRequest(safeUrl);
assert(safeUrlVerdict.allowed, "GitHub API HTTPS URL must be ALLOWED");

// 6. Test Secret Scrubber
const textWithSecret = "Found key AKIAIOSFODNN7EXAMPLE in session output.";
const scrubResult = scrubSecrets(textWithSecret);
assert(scrubResult.redactedCount === 1, "Must redact AWS key");
assert(scrubResult.sanitized.includes("[REDACTED_AWS_KEY]"), "Must replace AWS key with [REDACTED_AWS_KEY]");

// 7. Test Production Readiness Index (PRI)
const badPri = calculatePri({
  scanResult: sqliScan,
  trajectory: [],
  totalExecutionMs: 1200,
});
assert(badPri.recommendation === "REJECTED_DANGEROUS", "Vulnerable code must yield REJECTED_DANGEROUS recommendation");

const goodPri = calculatePri({
  scanResult: safeScan,
  trajectory: [],
  totalExecutionMs: 800,
});
assert(goodPri.recommendation === "APPROVED_FOR_PROD", "Safe code must yield APPROVED_FOR_PROD recommendation");
assert(goodPri.overallScore >= 95, "Safe code PRI score must be >= 95%");

console.log("\n🎯 ALL 10 SECURITY ASSERTIONS PASSED WITH 100% COMPLIANCE!");
