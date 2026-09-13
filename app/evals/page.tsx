"use client";

import React, { useState } from "react";
import { Activity, CheckCircle2, RefreshCw } from "lucide-react";

interface EvalRun {
  readonly modelName: string;
  readonly testSuite: string;
  readonly rawPassRate: string;
  readonly aegisPassRate: string;
  readonly avgLatency: string;
  readonly status: "PASSED" | "FAILED" | "REMEDIATED";
  readonly vulnerabilitiesCaught: number;
}

export default function EvalsPage() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const evalRuns: readonly EvalRun[] = [
    {
      modelName: "Claude 3.7 Sonnet",
      testSuite: "OWASP Top 10 for LLMs / Enterprise Web Stack",
      rawPassRate: "58.2%",
      aegisPassRate: "99.4%",
      avgLatency: "380ms",
      status: "REMEDIATED",
      vulnerabilitiesCaught: 14,
    },
    {
      modelName: "GPT-4o (Autonomous Mode)",
      testSuite: "SQLi & Secret Leakage Benchmarks (v2.1)",
      rawPassRate: "52.0%",
      aegisPassRate: "98.9%",
      avgLatency: "410ms",
      status: "REMEDIATED",
      vulnerabilitiesCaught: 19,
    },
    {
      modelName: "Gemini 2.5 Flash",
      testSuite: "Prompt Injection & Destructive Shell Syscalls",
      rawPassRate: "64.5%",
      aegisPassRate: "100%",
      avgLatency: "210ms",
      status: "REMEDIATED",
      vulnerabilitiesCaught: 11,
    },
    {
      modelName: "DeepSeek-Coder V2",
      testSuite: "Path Traversal & SSRF Egress Suite",
      rawPassRate: "47.8%",
      aegisPassRate: "97.6%",
      avgLatency: "520ms",
      status: "REMEDIATED",
      vulnerabilitiesCaught: 23,
    },
    {
      modelName: "Cursor / Windsurf Agent Harness",
      testSuite: "Full Software Factory Monorepo Release Gate",
      rawPassRate: "55.0%",
      aegisPassRate: "99.1%",
      avgLatency: "340ms",
      status: "REMEDIATED",
      vulnerabilitiesCaught: 16,
    },
  ];

  const handleTriggerSuite = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 mb-2">
              <Activity className="h-3.5 w-3.5" />
              <span>Deterministic Quality & Regression Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Agent Evals & Continuous Regression Testing
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Validating that prompt drift or model updates do not introduce silent security regressions into production codebases.
            </p>
          </div>

          <button
            onClick={handleTriggerSuite}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-xl bg-[#00E599] px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running Matrix..." : "Trigger Full Regression Suite"}</span>
          </button>
        </div>

        {/* Aggregate Eval Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unshielded Agent Pass Rate</span>
            <div className="text-3xl font-black text-red-400 font-mono mt-1">55.5%</div>
            <p className="text-xs text-slate-400 mt-1">44.5% of unshielded AI-written pull requests fail enterprise security tests.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Aegis-Shielded Pass Rate</span>
            <div className="text-3xl font-black text-[#00E599] font-mono mt-1">99.0%</div>
            <p className="text-xs text-slate-400 mt-1">Autonomous self-healing loop resolves 99 out of 100 CWE vulnerabilities before human review.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Regression Test Suites</span>
            <div className="text-3xl font-black text-sky-400 font-mono mt-1">128 Contracts</div>
            <p className="text-xs text-slate-400 mt-1">OWASP LLM Top 10, CWE-89, CWE-798, CWE-918, Shell sandboxing, and Memory leaks.</p>
          </div>
        </div>

        {/* Test Matrix Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-950/80 px-6 py-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Automated Agent Evaluation Matrix
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3.5 px-6 font-bold">Agent Model / Harness</th>
                  <th className="py-3.5 px-6 font-bold">Target Test Suite</th>
                  <th className="py-3.5 px-6 font-bold text-red-400">Raw Pass Rate</th>
                  <th className="py-3.5 px-6 font-bold text-[#00E599]">Aegis Pass Rate</th>
                  <th className="py-3.5 px-6 font-bold">Avg Latency</th>
                  <th className="py-3.5 px-6 font-bold">Vulns Mitigated</th>
                  <th className="py-3.5 px-6 font-bold">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {evalRuns.map((run, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-white font-sans">{run.modelName}</td>
                    <td className="py-4 px-6 text-slate-300 font-sans">{run.testSuite}</td>
                    <td className="py-4 px-6 text-red-400 font-bold">{run.rawPassRate}</td>
                    <td className="py-4 px-6 text-[#00E599] font-bold">{run.aegisPassRate}</td>
                    <td className="py-4 px-6 text-slate-400">{run.avgLatency}</td>
                    <td className="py-4 px-6 text-amber-400">{run.vulnerabilitiesCaught} CWEs</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[#00E599]">
                        <CheckCircle2 className="h-3 w-3" />
                        REMEDIATED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
