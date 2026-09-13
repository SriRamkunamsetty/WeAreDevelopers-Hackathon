"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, Cpu, Zap } from "lucide-react";

export function StatCards() {
  const stats = [
    {
      title: "Agent Actions Governed",
      value: "48,291",
      delta: "+14.8% this week",
      icon: Cpu,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "CWE Vulnerabilities Fixed",
      value: "1,894",
      subtext: "Neutralizing the 45% AI Code failure rate",
      icon: ShieldAlert,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Malicious Egress / Syscalls Blocked",
      value: "3,142",
      subtext: "100% data loss prevention",
      icon: ShieldCheck,
      color: "text-[#00E599]",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Average Gateway Overhead",
      value: "12.4ms",
      subtext: "Zero perceptible developer friction",
      icon: Zap,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/90"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{stat.title}</span>
              <div className={`rounded-lg border p-2 ${stat.bg}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black tracking-tight text-white font-mono">{stat.value}</div>
              {stat.delta && (
                <span className="text-[11px] font-medium text-emerald-400">{stat.delta}</span>
              )}
              {stat.subtext && (
                <span className="text-[11px] font-medium text-slate-400 block truncate">{stat.subtext}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
