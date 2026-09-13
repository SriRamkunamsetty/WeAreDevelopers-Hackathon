"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  Target,
  Check,
  X,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PitchPage() {
  const competitorMatrix = [
    {
      feature: "Pre-Execution Tool Interception (rm -rf, egress)",
      aegis: true,
      snyk: false,
      langfuse: false,
      dockerScout: false,
    },
    {
      feature: "Real-Time AST Code Vulnerability Detection (CWE-89, 798)",
      aegis: true,
      snyk: true,
      langfuse: false,
      dockerScout: false,
    },
    {
      feature: "Autonomous Agent Self-Healing Remediation Loop",
      aegis: true,
      snyk: false,
      langfuse: false,
      dockerScout: false,
    },
    {
      feature: "Indirect Prompt Injection Firewall",
      aegis: true,
      snyk: false,
      langfuse: false,
      dockerScout: false,
    },
    {
      feature: "Sub-15ms Edge Latency Overhead",
      aegis: true,
      snyk: false,
      langfuse: true,
      dockerScout: false,
    },
    {
      feature: "Production Readiness Index (PRI) Scoring",
      aegis: true,
      snyk: false,
      langfuse: false,
      dockerScout: false,
    },
  ];

  const pricingTiers = [
    {
      name: "Community & OSS",
      price: "$0",
      cadence: "forever free",
      description: "For individual builders and open source contributors running local coding agents.",
      features: [
        "Local Docker / CLI Interceptor proxy",
        "Top 10 CWE AST Static Scanners",
        "Secret scrubber (AWS, GitHub, OpenAI keys)",
        "Up to 5,000 tool inspections / month",
        "Community Discord support",
      ],
      cta: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro Developer & Team",
      price: "$49",
      cadence: "per engineer / month",
      description: "For startups and engineering teams deploying autonomous agents in daily CI/CD workflows.",
      features: [
        "Everything in Community",
        "Autonomous Self-Healing Remediation Loops",
        "Continuous Evals & GitHub PR badges",
        "50,000 tool inspections / month",
        "Custom enterprise network domain ACLs",
        "Real-time SecOps alert webhooks",
      ],
      cta: "Start 14-Day Trial",
      highlighted: true,
    },
    {
      name: "Enterprise Control Plane",
      price: "$499",
      cadence: "+ $0.001 per inspected call",
      description: "Full governance, audit trails, and compliance control plane for global engineering orgs.",
      features: [
        "Everything in Pro",
        "Multi-agent swarm governance (Claude, Devin, Cursor)",
        "SOC2 / ISO27001 audit export logs",
        "Dedicated VPC / On-prem gateway deployment",
        "Custom AST rule compiler & policy engine",
        "99.99% uptime SLA & 24/7 priority support",
      ],
      cta: "Contact Enterprise Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-[#00E599] mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Executive Summary & Pitch Deck for Lablab.ai Judges</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Business Case for <span className="text-[#00E599]">AegisAgent</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            A venture-scalable, category-defining AI infrastructure product solving the $18.4B crisis in autonomous software engineering.
          </p>
        </div>

        {/* The Core Problem & Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-6 backdrop-blur-sm">
            <div className="text-3xl font-black text-red-400 font-mono">45%</div>
            <h3 className="text-sm font-bold text-white mt-2">AI Code Security Failure</h3>
            <p className="text-xs text-slate-400 mt-1">
              Veracode and WeAreDevelopers data reveals that nearly half of AI-generated code introduces OWASP/CWE vulnerabilities into repos.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-6 backdrop-blur-sm">
            <div className="text-3xl font-black text-amber-400 font-mono">81%</div>
            <h3 className="text-sm font-bold text-white mt-2">Developer Security Anxiety</h3>
            <p className="text-xs text-slate-400 mt-1">
              81% of engineering teams are terrified of agents executing unverified shell commands, leaking API keys, or succumbing to prompt injections.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-sm">
            <div className="text-3xl font-black text-[#00E599] font-mono">0 ms</div>
            <h3 className="text-sm font-bold text-white mt-2">Existing Runtime Governance</h3>
            <p className="text-xs text-slate-400 mt-1">
              Current tools only scan code *after* it is committed or observe logs *after* an agent has already executed destructive actions.
            </p>
          </div>
        </div>

        {/* Market Size (TAM / SAM / SOM) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-[#00E599]" />
            <h2 className="text-lg font-bold text-white">Total Addressable Market (TAM)</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6 max-w-2xl">
            As software development transitions from manual typing to AI-delegated software factories, the security perimeter shifts entirely to the agent runtime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TAM (Global)</span>
              <div className="text-3xl font-black text-white font-mono mt-1">$18.4 Billion</div>
              <p className="text-xs text-slate-400 mt-2">
                DevSecOps, Application Security, and AI Governance platforms by 2028 (Gartner / IDC forecast).
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SAM (Serviceable)</span>
              <div className="text-3xl font-black text-[#00E599] font-mono mt-1">$3.6 Billion</div>
              <p className="text-xs text-slate-400 mt-2">
                Enterprise teams actively adopting autonomous coding agents (Claude 3.7, Devin, Cursor, Windsurf, AutoPR).
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">SOM (Target Year 1-2)</span>
              <div className="text-3xl font-black text-sky-400 font-mono mt-1">$45 Million</div>
              <p className="text-xs text-slate-400 mt-2">
                Capturing 1,200 mid-to-enterprise tech orgs looking for immediate agent compliance and runtime controls.
              </p>
            </div>
          </div>
        </div>

        {/* Competitive Matrix */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-[#00E599]" />
            <h2 className="text-lg font-bold text-white">Competitive Differentiation & Moat</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Why existing tools fall short in the agentic era:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-bold">Capabilities</th>
                  <th className="py-3 px-4 font-bold text-[#00E599]">AegisAgent</th>
                  <th className="py-3 px-4 font-bold text-slate-400">Snyk / Sonar</th>
                  <th className="py-3 px-4 font-bold text-slate-400">Langfuse / Arize</th>
                  <th className="py-3 px-4 font-bold text-slate-400">Docker Scout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {competitorMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-medium text-slate-300">{row.feature}</td>
                    <td className="py-3 px-4">
                      {row.aegis ? (
                        <span className="flex items-center gap-1 font-bold text-[#00E599]">
                          <Check className="h-4 w-4" /> Yes
                        </span>
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {row.snyk ? <Check className="h-4 w-4 text-slate-400" /> : <X className="h-4 w-4 text-slate-600" />}
                    </td>
                    <td className="py-3 px-4">
                      {row.langfuse ? <Check className="h-4 w-4 text-slate-400" /> : <X className="h-4 w-4 text-slate-600" />}
                    </td>
                    <td className="py-3 px-4">
                      {row.dockerScout ? <Check className="h-4 w-4 text-slate-400" /> : <X className="h-4 w-4 text-slate-600" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing & Revenue Model */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-[#00E599]" />
            <h2 className="text-lg font-bold text-white">Monetization & Unit Economics</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Hybrid SaaS seat subscription + utility-based inspection volume fee:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-6 flex flex-col justify-between ${
                  tier.highlighted
                    ? "border-[#00E599] bg-gradient-to-b from-emerald-950/20 to-slate-950 shadow-xl shadow-emerald-500/10"
                    : "border-slate-800 bg-slate-950/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#00E599] border border-emerald-500/30">
                        MOST POPULAR
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-white">{tier.price}</span>
                    <span className="text-xs text-slate-400">{tier.cadence}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{tier.description}</p>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#00E599] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`mt-8 w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
                    tier.highlighted
                      ? "bg-[#00E599] text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                      : "border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 12-Month Product Roadmap */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-[#00E599]" />
            <h2 className="text-lg font-bold text-white">12-Month Execution Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <span className="text-xs font-bold text-[#00E599]">Q4 2026 (Hackathon Launch)</span>
              <h4 className="text-xs font-bold text-white mt-1">Core Gateway & AST Scanners</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Next.js / Vercel Edge proxy, Top 6 CWE AST vulnerability rules, pre-execution command sandbox.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <span className="text-xs font-bold text-sky-400">Q1 2027</span>
              <h4 className="text-xs font-bold text-white mt-1">IDE & CI/CD Integrations</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                GitHub Action runner, Model Context Protocol (MCP) server daemon, VS Code / Cursor extension.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <span className="text-xs font-bold text-purple-400">Q2 2027</span>
              <h4 className="text-xs font-bold text-white mt-1">Multi-Agent Swarm Governance</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Inter-agent communication firewall, credential brokering, and cross-agent privilege isolation.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <span className="text-xs font-bold text-amber-400">Q3 2027</span>
              <h4 className="text-xs font-bold text-white mt-1">Enterprise SOC2 & On-Prem</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Self-hosted Kubernetes operator, automated SOC2/ISO audit compliance evidence exports.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Control Plane CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00E599] px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>Return to Live Runtime Control Plane</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
