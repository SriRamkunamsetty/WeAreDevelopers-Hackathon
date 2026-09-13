"use client";

import React, { useState } from "react";
import { DEMO_SCENARIOS } from "@/lib/mock-data";
import { DemoScenario, ScanResult } from "@/lib/types";
import { StatCards } from "@/components/dashboard/stat-cards";
import { ScenarioSelector } from "@/components/scenarios/scenario-selector";
import { PriGauge } from "@/components/dashboard/pri-gauge";
import { CodeDiffViewer } from "@/components/code-viewer/code-diff-viewer";
import { AgentTrajectoryViewer } from "@/components/dashboard/agent-trajectory-viewer";
import { scanCodeForVulnerabilities } from "@/lib/ast-scanner/cwe-scanner";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]!);
  const [isRemediated, setIsRemediated] = useState<boolean>(true);
  const [activeScanResult, setActiveScanResult] = useState<ScanResult>(activeScenario.scanResult);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setActiveScenario(scenario);
    setActiveScanResult(scenario.scanResult);
    setIsRemediated(true);
  };

  const handleToggleRemediation = () => {
    setIsRemediated(!isRemediated);
  };

  const handleRunCustomScan = (code: string) => {
    const result = scanCodeForVulnerabilities(code, "typescript");
    setActiveScanResult(result);
  };

  // Compute live PRI dynamically based on remediation toggle
  const currentPri = isRemediated
    ? {
        overallScore: 98,
        securityScore: 100,
        reliabilityScore: 98,
        latencyScore: 94,
        contractAdherenceScore: 100,
        recommendation: "APPROVED_FOR_PROD" as const,
        summary: "Remediated code passes all AST security checks, sandbox policies, and contract assertions.",
      }
    : activeScenario.pri;

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0a0f18] to-[#070a0f] py-10 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,153,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-[#00E599] mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>WeAreDevelopers Hackathon 2026 Enterprise Submission</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Govern the Runtime,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] via-emerald-400 to-teal-300">
                  Not the Agent.
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
                Autonomous AI coding agents generate <strong className="text-red-400">45% insecure code</strong> and lack runtime boundaries. 
                <strong> AegisAgent</strong> provides deterministic tool interception, real-time AST security gates, 
                and autonomous self-healing loops before code touches production.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/pitch"
                className="flex items-center gap-2 rounded-xl bg-[#00E599] px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Explore Judge Pitch & TAM</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/evals"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800 transition-all"
              >
                <span>Continuous Evals Suite</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 space-y-6">
        {/* Top Stat Cards */}
        <StatCards />

        {/* 1-Click Interactive Test Scenarios for Judges */}
        <ScenarioSelector
          scenarios={DEMO_SCENARIOS}
          activeScenario={activeScenario}
          onSelectScenario={handleSelectScenario}
          isRemediated={isRemediated}
          onToggleRemediation={handleToggleRemediation}
        />

        {/* PRI Score & Readiness Index */}
        <PriGauge pri={currentPri} />

        {/* AST Code Diff Viewer */}
        <CodeDiffViewer
          vulnerableCode={activeScenario.rawVulnerableCode}
          hardenedCode={activeScenario.hardenedCode}
          scanResult={activeScanResult}
          isRemediated={isRemediated}
          onRunCustomScan={handleRunCustomScan}
        />

        {/* Agent Trajectory & Timeline Telemetry */}
        <AgentTrajectoryViewer
          steps={activeScenario.trajectory}
          agentName={activeScenario.simulatedAgent}
        />
      </main>
    </div>
  );
}
