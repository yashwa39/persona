/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "p3-navy": "#0B192C",
        "p3-blue": "#1A3B5C",
        "p3-cyan": "#00E5FF",
        "p3-pink": "#FF0066",
        "p3-white": "#F8F9FA",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        body: ["var(--font-inter)"],
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
