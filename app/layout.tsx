import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AegisAgent — Runtime Governance & Security Control Plane for AI Agents",
  description: "Enterprise runtime firewall, AST vulnerability scanner, and deterministic evals for autonomous coding agents. Built for WeAreDevelopers Hackathon 2026.",
  openGraph: {
    title: "AegisAgent — AI Agent Runtime Governance",
    description: "Govern the Runtime, Not the Agent. Real-time AST security gates and prompt injection firewalls.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070a0f] text-slate-100 antialiased selection:bg-[#00E599] selection:text-black">
        <Navbar />
        {children}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © 2026 AegisAgent Open Source Project. Built for the{" "}
              <strong className="text-slate-300">WeAreDevelopers Hackathon</strong> on lablab.ai.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span>MIT License</span>
              <span>•</span>
              <span>Strict Google TypeScript Standard</span>
              <span>•</span>
              <span>Vercel Edge Ready</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
