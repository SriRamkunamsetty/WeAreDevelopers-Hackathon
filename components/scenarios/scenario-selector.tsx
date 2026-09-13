"use client";

import React from "react";
import { DemoScenario } from "@/lib/types";
import { Play, CheckCircle } from "lucide-react";

interface ScenarioSelectorProps {
  readonly scenarios: readonly DemoScenario[];
  readonly activeScenario: DemoScenario;
  readonly onSelectScenario: (scenario: DemoScenario) => void;
  readonly isRemediated: boolean;
  readonly onToggleRemediation: () => void;
}

export function ScenarioSelector({
  scenarios,
  activeScenario,
  onSelectScenario,
  isRemediated,
  onToggleRemediation,
}: ScenarioSelectorProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#00E599]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Interactive Test Scenarios for Hackathon Judges
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Choose an enterprise threat vector to simulate real-time runtime interception and AST auto-remediation.
          </p>
        </div>

        {/* Remediation Toggle Switch */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              if (isRemediated) onToggleRemediation();
            }}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              !isRemediated
                ? "bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Raw Vulnerable Output
          </button>
          <button
            onClick={() => {
              if (!isRemediated) onToggleRemediation();
            }}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
              isRemediated
                ? "bg-emerald-500/20 text-[#00E599] border border-emerald-500/40 shadow-sm glow-emerald"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            Aegis Auto-Remediated
          </button>
        </div>
      </div>

      {/* 4 Scenario Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((sc) => {
          const isSelected = sc.id === activeScenario.id;
          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-[#00E599] bg-[#00E599]/5 shadow-md shadow-emerald-500/10"
                  : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSelected ? "bg-emerald-500/20 text-[#00E599] border-emerald-500/30" : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    {sc.badge}
                  </span>
                  {isSelected && <Play className="h-3 w-3 text-[#00E599] fill-[#00E599]" />}
                </div>
                <h4 className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-slate-300"}`}>
                  {sc.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                {sc.headline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
