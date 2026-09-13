# AegisAgent — Runtime Governance & Security Control Plane for AI Coding Agents

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Google%20Standard-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15%20App%20Router-black.svg)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel%20Edge-black.svg)](https://vercel.com/)
[![WeAreDevelopers](https://img.shields.io/badge/Hackathon-WeAreDevelopers%202026-orange.svg)](https://lablab.ai/ai-hackathons/wearedevelopers-hackathon)

> **"Govern the Runtime, Not the Agent: One Control Plane for Every Model, Every Harness."**  
> *Built for the WeAreDevelopers Hackathon alongside WeAreDevelopers World Congress North America 2026.*

---

## 🌟 Executive Summary & The Problem We Solve

Autonomous AI coding agents (Claude 3.7 Sonnet, Devin, Cursor, Windsurf, AutoPR) are taking over software engineering workflows. However, production adoption faces a catastrophic blocker:

* **45% of AI-generated code fails security checks** (Veracode & CNCF benchmark data highlighted at WeAreDevelopers Congress).
* **81% of engineering teams distrust AI agent safety**, fearing destructive shell commands (`rm -rf /`), credential leakage, and indirect prompt injection.
* Existing solutions (Snyk, SonarQube) only scan code *after* commit, while observability tools (Langfuse) only record traces *after* damage has occurred.

**AegisAgent** is the first **Pre-Execution Runtime Control Plane & Security Firewall** built specifically for autonomous coding agents. It intercepts tool calls in real time (<15ms latency), runs AST security vulnerability gates (CWE-89, CWE-798, CWE-79, CWE-918, CWE-22), and triggers an autonomous **self-healing feedback loop** so agents fix their own vulnerabilities before code touches human PR review.

---

## 🛡️ Core Capabilities

### 1. Pre-Execution Tool Call Interception
Intercepts and evaluates shell commands, network egress requests, and file writes before kernel/network execution:
* Blocks destructive root removal (`rm -rf /`, `rmdir /s /q`)
* Blocks remote code piping into shells (`curl ... | bash`)
* Enforces network domain allow-lists and prevents Server-Side Request Forgery (SSRF) against internal VPCs or AWS metadata (`169.254.169.254`).

### 2. AST Code Security Scanner ("The 45% AI Code Fix")
Static analysis on AI-generated patches across TypeScript, JavaScript, Python, and SQL:
* **CWE-89**: SQL Injection via raw string template literals
* **CWE-798**: Hardcoded API keys, JWTs, and cloud credentials
* **CWE-79**: Cross-Site Scripting (unsafe DOM insertions)
* **CWE-918**: Server-Side Request Forgery
* **CWE-22**: Directory Path Traversal
* **CWE-78**: OS Command Injection

### 3. Autonomous Self-Healing Remediation Loop
When an agent proposes insecure code, AegisAgent rejects the patch at the gateway and injects targeted remediation feedback directly back into the agent context, prompting the agent to self-harden its code into parameterized, safe implementations.

### 4. Production Readiness Index (PRI)
Deterministic composite scoring engine evaluating:
* Security & AST Compliance (40% Weight)
* Runtime Sandbox & Boundary (25% Weight)
* Contract & Schema Adherence (20% Weight)
* Latency Budget & Overhead (15% Weight)

---

## 🚀 Live Demo & Interactive Scenarios

The web interface features 4 pre-configured enterprise threat scenarios:
1. **SQLi Vulnerability & Auto-Remediation**: Watch an agent write raw template SQL, get blocked by AegisAgent, and self-heal into parameterized queries ($1, $2) with Zod validation.
2. **Indirect Prompt Injection & Secret Theft**: A malicious issue attempts to exfiltrate `AWS_ACCESS_KEY_ID`. AegisAgent blocks the untrusted domain and redacts the credentials.
3. **Destructive Command Containment**: An agent attempts an uncontained recursive directory purge (`rm -rf /`), intercepted before OS execution.
4. **100% Compliant Enterprise Rollout**: Clean TypeScript authentication workflow with bcrypt hashing and strict schema validation achieving a 99% PRI score.

---

## 🛠️ Architecture & Tech Stack

```
┌──────────────────────────────────────────────────────────┐
│                   Autonomous Coding Agent                 │
│         (Claude 3.7 / Gemini 2.5 / GPT-4o / Local)       │
└────────────────────────────┬─────────────────────────────┘
                             │ Tool Call (bash, write_file, web, sql)
                             ▼
┌──────────────────────────────────────────────────────────┐
│              AEGISAGENT RUNTIME CONTROL PLANE             │
│                                                          │
│  ┌────────────────────┐  ┌─────────────────────────────┐ │
│  │ Policy Interceptor │  │ AST Static Security Scanner │ │
│  │ (Command Sandbox,  │  │ (CWE-89, CWE-798, CWE-79,   │ │
│  │ Network Domain ACL,│  │ CWE-918, Path Traversal)    │ │
│  │ PII/Secret Redact) │  └──────────────┬──────────────┘ │
│  └─────────┬──────────┘                 │                │
│            │ Passes policy              │ Insecure code  │
│            ▼                            ▼                │
│  ┌────────────────────┐  ┌─────────────────────────────┐ │
│  │  Virtual Sandbox   │  │   Auto-Remediation Feedback  │ │
│  │ Execution & Audit  │  │    Loop (Agent Self-Heal)   │ │
│  └────────────────────┘  └─────────────────────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Deterministic Evals & PRI (Prod Readiness Index)   │ │
│  └─────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│         Enterprise Modern Dashboard & Pitch Room         │
│  (Session Replay, Live Scenarios, Evals, Business Case)  │
└──────────────────────────────────────────────────────────┘
```

* **Framework**: Next.js 15 (App Router, Server Actions)
* **Language**: Strict TypeScript (Google TypeScript Style Guide)
* **Styling**: Tailwind CSS, Dark Theme Design System, Lucide Icons
* **Validation**: Zod (Schema-enforced requests and domain models)
* **Testing**: Standalone security assertion test suite (`scripts/verify-security.ts`)
* **Deployment Target**: Vercel (Edge & Serverless compatibility)

---

## 💻 Quickstart: Run Locally

### Prerequisites
* Node.js >= 18.x
* npm >= 9.x

### Installation
```bash
# 1. Clone repository
git clone https://github.com/SriRamkunamsetty/WeAreDevelopers-Hackathon.git
cd WeAreDevelopers-Hackathon

# 2. Install dependencies
npm install

# 3. Run automated security verification suite
npx tsx scripts/verify-security.ts

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Automated Security Verification

Run the built-in test suite to verify AST scanners, command sandboxing, SSRF filters, and PRI scoring:
```bash
npx tsx scripts/verify-security.ts
```

All 10 security assertions run and validate with 100% compliance.

---

## ☁️ Deploy to Vercel

Deploying to Vercel takes 1 minute:

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `aegisagent-control-plane` repository.
4. Click **Deploy**. (Next.js 15 configuration is pre-optimized for zero-configuration Vercel deployment).

---

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE).
