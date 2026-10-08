import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        void: {
          950: "#08080c",
          900: "#0f1017",
          800: "#181824",
          700: "#222233",
        },
        cyber: { DEFAULT: "#00f2fe", soft: "#5ff8ff" },
        violet: { neon: "#7928ca", glow: "#a855f7" },
        arcade: { DEFAULT: "#ffb547", deep: "#ff8a00" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-pixel)", "var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(135deg, #00f2fe 0%, #7928ca 60%, #ff3cac 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 0 1px rgba(0,242,254,0.35), 0 8px 32px -6px rgba(0,242,254,0.45)",
        "glow-violet": "0 0 0 1px rgba(121,40,202,0.4), 0 8px 40px -8px rgba(121,40,202,0.6)",
        pixel: "3px 3px 0 0 rgba(0,0,0,0.6)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        scan: "scan 4s linear infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [typography, animate],
};

export default config;
