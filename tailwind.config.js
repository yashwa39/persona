/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "p3-navy": "#050505",
        "p3-blue": "#141414",
        "p3-cyan": "#FF2B2B",
        "p3-pink": "#8E0E0E",
        "p3-white": "#F5F5F5",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "water-drift": {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)", opacity: "0.15" },
          "50%": { transform: "translate3d(20px, -40px, 0) scale(1.08)", opacity: "0.25" },
          "100%": { transform: "translate3d(-15px, -90px, 0) scale(1.12)", opacity: "0" },
        },
      },
      animation: {
        "water-drift": "water-drift 12s linear infinite",
      },
    },
  },
  plugins: [],
};
