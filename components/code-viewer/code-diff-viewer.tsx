"use client";

import React, { useState } from "react";
import { ScanResult } from "@/lib/types";
import { Code2, ShieldAlert, CheckCircle, RefreshCw, AlertOctagon } from "lucide-react";

interface CodeDiffViewerProps {
  readonly vulnerableCode: string;
  readonly hardenedCode: string;
  readonly scanResult: ScanResult;
  readonly isRemediated: boolean;
  readonly onRunCustomScan?: (customCode: string) => void;
}

export function CodeDiffViewer({
  vulnerableCode,
  hardenedCode,
  scanResult,
  isRemediated,
  onRunCustomScan,
}: CodeDiffViewerProps) {
  const [activeTab, setActiveTab] = useState<"diff" | "vulnerable" | "hardened" | "custom">("diff");
  const [customInput, setCustomInput] = useState<string>(vulnerableCode);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleCustomScan = () => {
    if (!onRunCustomScan) return;
    setIsScanning(true);
    setTimeout(() => {
      onRunCustomScan(customInput);
      setIsScanning(false);
    }, 400);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[#00E599]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              AST Security Diff & Vulnerability Inspector
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("diff")}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                activeTab === "diff" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Side-by-Side View
            </button>
            <button
              onClick={() => setActiveTab("vulnerable")}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                activeTab === "vulnerable" ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Vulnerable Raw Output
            </button>
            <button
              onClick={() => setActiveTab("hardened")}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                activeTab === "hardened" ? "bg-emerald-500/20 text-[#00E599]" : "text-slate-400 hover:text-white"
              }`}
            >
              Remediated Patch
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                activeTab === "custom" ? "bg-sky-500/20 text-sky-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Custom Code Tester
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {isRemediated || scanResult.isSecure ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-[#00E599]">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>0 CWE VULNERABILITIES</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400 animate-pulse">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>{scanResult.totalFindings} CWE VULNERABILITY DETECTED</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4">
        {activeTab === "diff" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Raw Code */}
            <div className="rounded-lg border border-red-500/30 bg-slate-950/90 p-4 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2 mb-3">
                <span className="font-bold text-red-400 flex items-center gap-1.5">
                  <AlertOctagon className="h-3.5 w-3.5" />
                  Agent Output (Pre-Aegis Firewall)
                </span>
                <span className="text-[10px] text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  {scanResult.vulnerabilities.length > 0 ? "FAILED GATES" : "COMPLIANT"}
                </span>
              </div>
              <pre className="text-slate-300 leading-relaxed overflow-x-auto">
                {vulnerableCode}
              </pre>

              {/* Vulnerabilities Detected Details */}
              {scanResult.vulnerabilities.length > 0 && (
                <div className="mt-4 pt-3 border-t border-red-500/20 space-y-2">
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                    AST Static Findings:
                  </div>
                  {scanResult.vulnerabilities.map((v, i) => (
                    <div key={i} className="p-2.5 rounded bg-red-950/40 border border-red-500/30 text-[11px]">
                      <div className="flex items-center justify-between font-bold text-red-300">
                        <span>[{v.cweId}] {v.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">Lines {v.lineStart}-{v.lineEnd}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{v.description}</p>
                      <div className="mt-1.5 text-emerald-400 font-semibold flex items-center gap-1">
                        <span>Fix: {v.remediation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Hardened Code */}
            <div className="rounded-lg border border-emerald-500/30 bg-slate-950/90 p-4 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-3">
                <span className="font-bold text-[#00E599] flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Hardened Code (Post-Aegis Remediation)
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  PASSED SECURITY AUDIT
                </span>
              </div>
              <pre className="text-slate-200 leading-relaxed overflow-x-auto">
                {hardenedCode}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "vulnerable" && (
          <div className="rounded-lg border border-red-500/30 bg-slate-950/90 p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-red-300 leading-relaxed">{vulnerableCode}</pre>
          </div>
        )}

        {activeTab === "hardened" && (
          <div className="rounded-lg border border-emerald-500/30 bg-slate-950/90 p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-emerald-300 leading-relaxed">{hardenedCode}</pre>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Paste any AI-generated TypeScript, JavaScript, or SQL code to test live AST detection:</span>
              <button
                onClick={handleCustomScan}
                disabled={isScanning}
                className="flex items-center gap-1.5 rounded-md bg-[#00E599] px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
                <span>Run Live AST Analysis</span>
              </button>
            </div>
            <textarea
              rows={12}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:border-[#00E599] focus:outline-none"
              placeholder="Paste custom code here to scan for CWE-89, CWE-798, CWE-79, CWE-918, CWE-22..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
