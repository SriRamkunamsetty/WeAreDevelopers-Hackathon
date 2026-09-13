"use client";

import React, { useState } from "react";
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  GitMerge,
  ExternalLink,
  Lock,
  Code,
  Check,
} from "lucide-react";

export default function PullRequestReviewPage() {
  const [remediated, setRemediated] = useState<boolean>(false);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [merged, setMerged] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"conversation" | "files">("files");

  const handleRemediate = () => {
    setIsFixing(true);
    setTimeout(() => {
      setIsFixing(false);
      setRemediated(true);
    }, 900);
  };

  const handleMerge = () => {
    if (!remediated) return;
    setMerged(true);
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb & Repo Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="font-semibold text-slate-200">SriRamkunamsetty</span>
            <span>/</span>
            <a
              href="https://github.com/SriRamkunamsetty/WeAreDevelopers-Hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-emerald-400 flex items-center gap-1"
            >
              WeAreDevelopers-Hackathon
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs font-mono text-slate-300">
              GitHub CI/CD Webhook Simulation
            </span>
          </div>
        </div>

        {/* PR Title & Status */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-white">
              feat(api): Add SQL authentication endpoint for developer accounts
            </h1>
            <span className="text-xl font-normal text-slate-500">#142</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            {merged ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1 font-bold text-white">
                <GitMerge className="h-3.5 w-3.5" /> Merged
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 font-bold text-white">
                <GitPullRequest className="h-3.5 w-3.5" /> Open
              </span>
            )}
            <span>
              <strong className="text-slate-200">cursor-ai-agent [bot]</strong> wants to merge 1 commit into{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-200">main</code> from{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-200">
                cursor-agent-patch-1
              </code>
            </span>
          </div>
        </div>

        {/* PR Tabs */}
        <div className="flex border-b border-slate-800 text-xs font-semibold text-slate-400 gap-6">
          <button
            onClick={() => setActiveTab("files")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "files"
                ? "border-emerald-500 text-emerald-400 font-bold"
                : "border-transparent hover:text-slate-200"
            }`}
          >
            <Code className="h-4 w-4" />
            Files changed <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px]">1</span>
          </button>
          <button
            onClick={() => setActiveTab("conversation")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "conversation"
                ? "border-emerald-500 text-emerald-400 font-bold"
                : "border-transparent hover:text-slate-200"
            }`}
          >
            <GitPullRequest className="h-4 w-4" />
            Conversation & Checks
          </button>
        </div>

        {/* Security Checks Banner */}
        <div
          className={`rounded-2xl border p-5 transition-all ${
            remediated
              ? "border-emerald-500/40 bg-emerald-950/20"
              : "border-rose-500/40 bg-rose-950/20"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              {remediated ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <XCircle className="h-5 w-5" />
                </div>
              )}
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {remediated
                    ? "AegisAgent Security Check — PASSED"
                    : "AegisAgent Security Gate — MERGE BLOCKED"}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                      remediated
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    PRI SCORE: {remediated ? "98 / 100" : "32 / 100"}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {remediated
                    ? "All AST vulnerability scans passed. Code is parameterized, safe, and complies with SOC 2 policies."
                    : "CWE-89 (SQL Injection) detected in app/api/auth/login/route.ts. Merging is strictly prevented by branch protection."}
                </p>
              </div>
            </div>

            {!remediated && (
              <button
                onClick={handleRemediate}
                disabled={isFixing}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto disabled:opacity-50"
              >
                <Sparkles className={`h-4 w-4 ${isFixing ? "animate-spin" : ""}`} />
                {isFixing ? "Patching AST..." : "Trigger Aegis Auto-Remediation"}
              </button>
            )}
          </div>
        </div>

        {/* Diff & Inline Annotation Viewer */}
        <div className="rounded-xl border border-slate-800 bg-[#06080d] overflow-hidden shadow-xl">
          {/* File Header */}
          <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <span className="font-bold text-white">app/api/auth/login/route.ts</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400">+12</span>
              <span className="text-rose-400">-4</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">TypeScript (Next.js App Router)</span>
          </div>

          {/* Code Diff Table */}
          <div className="font-mono text-xs overflow-x-auto divide-y divide-slate-800/40">
            <div className="flex bg-slate-950 px-4 py-1 text-slate-500">
              <span className="w-8 select-none">9</span>
              <span>import &#123; db &#125; from &quot;@/lib/database&quot;;</span>
            </div>
            <div className="flex bg-slate-950 px-4 py-1 text-slate-500">
              <span className="w-8 select-none">10</span>
              <span>export async function POST(req: Request) &#123;</span>
            </div>
            <div className="flex bg-slate-950 px-4 py-1 text-slate-500">
              <span className="w-8 select-none">11</span>
              <span>&nbsp;&nbsp;const &#123; email, password &#125; = await req.json();</span>
            </div>

            {/* Vulnerable or Remediated Line */}
            {remediated ? (
              <>
                <div className="flex bg-rose-950/20 px-4 py-1 text-rose-400 border-l-4 border-rose-500 line-through opacity-70">
                  <span className="w-8 select-none">- 12</span>
                  <span>
                    &nbsp;&nbsp;const sql = &quot;SELECT * FROM users WHERE email = &apos;&quot; + email + &quot;&apos;&quot;;
                  </span>
                </div>
                <div className="flex bg-emerald-950/40 px-4 py-1 text-emerald-300 border-l-4 border-emerald-500 font-bold">
                  <span className="w-8 select-none">+ 12</span>
                  <span>
                    &nbsp;&nbsp;const query = &quot;SELECT * FROM users WHERE email = $1&quot;;
                  </span>
                </div>
                <div className="flex bg-emerald-950/40 px-4 py-1 text-emerald-300 border-l-4 border-emerald-500 font-bold">
                  <span className="w-8 select-none">+ 13</span>
                  <span>
                    &nbsp;&nbsp;const result = await db.query(query, [email]);
                  </span>
                </div>
              </>
            ) : (
              <div className="flex bg-rose-950/40 px-4 py-1.5 text-rose-300 border-l-4 border-rose-500 font-bold">
                <span className="w-8 select-none">12</span>
                <span>
                  &nbsp;&nbsp;const sql = &quot;SELECT * FROM users WHERE email = &apos;&quot; + email + &quot;&apos;&quot;;
                </span>
              </div>
            )}

            {/* Inline Bot Review Comment */}
            <div className="p-4 bg-slate-900/40">
              <div
                className={`rounded-xl border p-4 space-y-3 ${
                  remediated
                    ? "border-emerald-500/30 bg-emerald-950/20"
                    : "border-rose-500/40 bg-rose-950/20"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">aegis-security-bot</span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
                      bot
                    </span>
                    <span className="text-[11px] text-slate-500">reviewed just now</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      remediated
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    }`}
                  >
                    {remediated ? "STATUS: RESOLVED" : "STATUS: REQUESTING CHANGES"}
                  </span>
                </div>

                {remediated ? (
                  <div className="space-y-2 text-xs text-slate-200">
                    <p className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Check className="h-4 w-4" /> Auto-Remediation Applied & Verified
                    </p>
                    <p className="text-slate-400">
                      Query converted from dangerous concatenation to parameterized positional arguments (<code className="text-emerald-300">$1</code>). AST validation confirms 0 CWE flags remain. Merge clearance approved.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-slate-200">
                    <p className="flex items-center gap-2 text-rose-400 font-bold">
                      <ShieldAlert className="h-4 w-4" /> Critical Vulnerability: CWE-89 (SQL Injection)
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Line 12 constructs a database query via string concatenation with unvalidated user input <code className="text-rose-300 bg-rose-950 px-1 py-0.5 rounded">email</code>. An attacker can supply <code className="text-rose-300">&apos; OR &apos;1&apos;=&apos;1</code> to bypass authentication and dump entire table contents.
                    </p>

                    <div className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-slate-300 space-y-1 border border-slate-800">
                      <div className="text-slate-500">// Suggested remediation:</div>
                      <div className="text-emerald-400">const query = &quot;SELECT * FROM users WHERE email = $1&quot;;</div>
                      <div className="text-emerald-400">const result = await db.query(query, [email]);</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex bg-slate-950 px-4 py-1 text-slate-500">
              <span className="w-8 select-none">14</span>
              <span>&nbsp;&nbsp;return Response.json(&#123; user: result.rows[0] &#125;);</span>
            </div>
            <div className="flex bg-slate-950 px-4 py-1 text-slate-500">
              <span className="w-8 select-none">15</span>
              <span>&#125;</span>
            </div>
          </div>
        </div>

        {/* Merge Button & Action Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {merged ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    Pull Request Merged
                  </>
                ) : remediated ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Branch Ready to Merge
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-rose-400" />
                    Branch Protection Enforced
                  </>
                )}
              </h4>
              <p className="text-xs text-slate-400">
                {merged
                  ? "Changes merged into main. Merkle audit block SHA-256 generated."
                  : remediated
                  ? "Required status checks passed. Commit signed and cleared by Aegis Gatekeeper."
                  : "Merging is blocked until all security checks and AST validations pass."}
              </p>
            </div>

            {merged ? (
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/40 px-5 py-2.5 text-xs font-bold text-purple-300 font-mono">
                PR #142 Merged into main
              </div>
            ) : (
              <button
                onClick={handleMerge}
                disabled={!remediated}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold transition-all shadow-lg ${
                  remediated
                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 shadow-emerald-500/20"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                }`}
              >
                <GitMerge className="h-4 w-4" />
                Merge pull request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
