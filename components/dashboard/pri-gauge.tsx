"use client";

import React from "react";
import { ProductionReadinessIndex } from "@/lib/types";
import { Shield, CheckCircle2, AlertTriangle, XCircle, Gauge } from "lucide-react";

interface PriGaugeProps {
  readonly pri: ProductionReadinessIndex;
}

export function PriGauge({ pri }: PriGaugeProps) {
  const getBadge = (rec: ProductionReadinessIndex["recommendation"]) => {
    switch (rec) {
      case "APPROVED_FOR_PROD":
        return {
          label: "APPROVED FOR PRODUCTION",
          icon: CheckCircle2,
          color: "bg-emerald-500/10 border-emerald-500/30 text-[#00E599]",
        };
      case "REQUIRES_HUMAN_REVIEW":
        return {
          label: "REQUIRES HUMAN REVIEW",
          icon: AlertTriangle,
          color: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        };
      case "REJECTED_DANGEROUS":
        return {
          label: "REJECTED BY RUNTIME GATEWAY",
          icon: XCircle,
          color: "bg-red-500/10 border-red-500/30 text-red-400",
        };
    }
  };

  const badge = getBadge(pri.recommendation);
  const BadgeIcon = badge.icon;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-[#00E599]" />
          <h3 className="text-sm font-bold text-white tracking-tight">Production Readiness Index (PRI)</h3>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badge.color}`}>
          <BadgeIcon className="h-3.5 w-3.5" />
          <span>{badge.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Main Composite Score Dial */}
        <div className="md:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl border border-slate-800/80 bg-slate-950/60">
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="8"
                className={`${
                  pri.overallScore >= 85
                    ? "text-[#00E599]"
                    : pri.overallScore >= 60
                    ? "text-amber-400"
                    : "text-red-500"
                } transition-all duration-1000 ease-out`}
                strokeDasharray={326.7}
                strokeDashoffset={326.7 - (326.7 * pri.overallScore) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-mono text-white tracking-tight">
                {pri.overallScore}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                OVERALL PRI
              </span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400 max-w-xs">{pri.summary}</p>
        </div>

        {/* 4 Dimension Breakdown */}
        <div className="md:col-span-3 space-y-3">
          {/* Security Score */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#00E599]" />
                Security & AST Compliance (40% Weight)
              </span>
              <span className="font-mono text-white">{pri.securityScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  pri.securityScore >= 80 ? "bg-[#00E599]" : pri.securityScore >= 50 ? "bg-amber-400" : "bg-red-500"
                }`}
                style={{ width: `${pri.securityScore}%` }}
              />
            </div>
          </div>

          {/* Reliability & Boundary */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Runtime Sandbox & Boundary (25% Weight)</span>
              <span className="font-mono text-white">{pri.reliabilityScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-sky-400 transition-all duration-700"
                style={{ width: `${pri.reliabilityScore}%` }}
              />
            </div>
          </div>

          {/* Contract Adherence */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Contract & Schema Adherence (20% Weight)</span>
              <span className="font-mono text-white">{pri.contractAdherenceScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-purple-400 transition-all duration-700"
                style={{ width: `${pri.contractAdherenceScore}%` }}
              />
            </div>
          </div>

          {/* Latency Budget */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Latency Budget & Overhead (15% Weight)</span>
              <span className="font-mono text-white">{pri.latencyScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-700"
                style={{ width: `${pri.latencyScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
