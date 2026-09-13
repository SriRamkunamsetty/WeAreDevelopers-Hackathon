"use client";

import React, { useState } from "react";
import { Settings, Globe, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [policies, setPolicies] = useState([
    {
      id: "rule-cwe89",
      name: "Enforce Parameterized SQL (CWE-89 Firewall)",
      description: "Strictly block dynamic string interpolation in database query calls.",
      enabled: true,
      category: "AST Code Analysis",
    },
    {
      id: "rule-cwe798",
      name: "Zero Hardcoded Secret Tolerance (CWE-798)",
      description: "Scan all AI-generated code for API keys, AWS credentials, and JWT tokens.",
      enabled: true,
      category: "AST Code Analysis",
    },
    {
      id: "rule-ssrf",
      name: "Internal Network SSRF Quarantine",
      description: "Block agent network requests to 127.0.0.1, 10.0.0.0/8, and 169.254.169.254.",
      enabled: true,
      category: "Network Gateway",
    },
    {
      id: "rule-sandbox-cmd",
      name: "Destructive Shell Command Sandbox",
      description: "Halt all rm -rf /, recursive chmod, fork bombs, and reverse shells.",
      enabled: true,
      category: "Syscall Interception",
    },
    {
      id: "rule-auto-heal",
      name: "Autonomous Agent Self-Healing Feedback Loop",
      description: "Automatically prompt the agent to refactor its code when a CWE vulnerability is caught.",
      enabled: true,
      category: "Agent Automation",
    },
  ]);

  const togglePolicy = (id: string) => {
    setPolicies(
      policies.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400 mb-2">
              <Settings className="h-3.5 w-3.5" />
              <span>Enterprise Runtime Policy Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Security Firewalls & Guardrails
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure pre-execution tool interception rules, AST vulnerability gates, and network access perimeters.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-[#00E599] px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saved ? "Policy Saved!" : "Save Policy Config"}</span>
          </button>
        </div>

        {/* Policy Rule Cards */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm divide-y divide-slate-800">
          {policies.map((policy) => (
            <div key={policy.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {policy.category}
                  </span>
                  <h4 className="text-sm font-bold text-white">{policy.name}</h4>
                </div>
                <p className="text-xs text-slate-400 mt-1">{policy.description}</p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => togglePolicy(policy.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  policy.enabled ? "bg-[#00E599]" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    policy.enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Network Domain Allow-List Preview */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Approved Outbound Developer Registries (Network ACL)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Coding agents can only make network egress calls to verified registries and API endpoints:
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "api.github.com",
              "registry.npmjs.org",
              "pypi.org",
              "crates.io",
              "api.anthropic.com",
              "api.openai.com",
              "generativelanguage.googleapis.com",
            ].map((domain, i) => (
              <span
                key={i}
                className="font-mono text-xs px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950 text-emerald-400 flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
