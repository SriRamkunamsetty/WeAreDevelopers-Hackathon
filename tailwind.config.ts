import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "#00E599", // Neon Emerald - Aegis Brand
          foreground: "#000000",
          hover: "#00C782",
        },
        secondary: {
          DEFAULT: "#38BDF8", // Electric Sky
          foreground: "#000000",
        },
        danger: {
          DEFAULT: "#EF4444", // High Alert Red
          foreground: "#FFFFFF",
          muted: "rgba(239, 68, 68, 0.15)",
        },
        warning: {
          DEFAULT: "#F59E0B", // Amber Warning
          foreground: "#000000",
          muted: "rgba(245, 158, 11, 0.15)",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
          muted: "rgba(16, 185, 129, 0.15)",
        },
        terminal: {
          bg: "#0B0F17",
          border: "#1E293B",
          text: "#E2E8F0",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scan 2s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
