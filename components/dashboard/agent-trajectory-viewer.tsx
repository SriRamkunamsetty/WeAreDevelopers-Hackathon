"use client";

import React from "react";
import { TrajectoryStep } from "@/lib/types";
import { Brain, Terminal, ShieldAlert, CheckCircle, Clock, Zap } from "lucide-react";

interface AgentTrajectoryViewerProps {
  readonly steps: readonly TrajectoryStep[];
  readonly agentName: string;
}

export function AgentTrajectoryViewer({ steps, agentName }: AgentTrajectoryViewerProps) {
  const getPhaseStyle = (phase: TrajectoryStep["phase"]) => {
    switch (phase) {
      case "THOUGHT":
        return {
          icon: Brain,
          color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
          tag: "AGENT THOUGHT",
        };
      case "TOOL_REQUEST":
        return {
          icon: Terminal,
          color: "text-sky-400 bg-sky-500/10 border-sky-500/30",
          tag: "TOOL CALL REQUEST",
        };
      case "AEGIS_GATEWAY":
        return {
          icon: ShieldAlert,
          color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
          tag: "AEGIS INTERCEPTION GATE",
        };
      case "EXECUTION":
        return {
          icon: Zap,
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          tag: "SANDBOX REMEDIATION",
        };
      case "VERDICT":
        return {
          icon: CheckCircle,
          color: "text-[#00E599] bg-emerald-500/20 border-emerald-500/40",
          tag: "COMPLIANCE VERDICT",
        };
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Agent Reasoning Trace & Gateway Telemetry
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
          Harness: {agentName}
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {steps.map((step) => {
          const style = getPhaseStyle(step.phase);
          const Icon = style.icon;

          return (
            <div key={step.stepNumber} className="relative group">
              {/* Dot on timeline */}
              <div className={`absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border bg-slate-950 ${style.color}`}>
                <Icon className="h-3 w-3" />
              </div>

              {/* Step Card */}
              <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3.5 transition-all hover:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${style.color}`}>
                      {style.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {step.latencyMs}ms
                    </span>
                    {step.tokenCost > 0 && (
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-amber-500" />
                        {step.tokenCost} tokens
                      </span>
                    )}
                    <span className="text-slate-600">{step.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-mono leading-relaxed mt-1 whitespace-pre-wrap">
                  {step.content}
                </p>

                {/* If there's an interception verdict */}
                {step.verdict && (
                  <div className={`mt-2.5 rounded border p-2.5 text-xs ${
                    step.verdict.action === "BLOCK"
                      ? "border-red-500/30 bg-red-950/30 text-red-300"
                      : step.verdict.action === "REMEDIATE"
                      ? "border-amber-500/30 bg-amber-950/30 text-amber-300"
                      : "border-emerald-500/30 bg-emerald-950/30 text-emerald-300"
                  }`}>
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>[{step.verdict.ruleId}] {step.verdict.ruleName}</span>
                      <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-black/40">
                        {step.verdict.action}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90">{step.verdict.reason}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
