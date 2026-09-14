import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mednavy: {
          DEFAULT: "#0B192C",
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          700: "#1E2E45",
          800: "#142136",
          900: "#0B192C",
        },
        medteal: {
          DEFAULT: "#007791",
          50: "#F0FAFC",
          100: "#E0F4F7",
          200: "#BEE5EC",
          500: "#007791",
          600: "#005F73",
          700: "#004B5B",
        },
        medemerald: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
        },
      },
      boxShadow: {
        'soft-glow': '0 4px 25px -2px rgba(0, 119, 145, 0.12)',
        'clinical': '0 2px 14px 0 rgba(11, 25, 44, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
