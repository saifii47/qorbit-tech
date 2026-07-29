/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep space black backgrounds
        "brand-void": "#050510",
        "brand-dark": "#080820",
        "brand-surface": "#0d1432",
        // Electric blue accent
        "brand-blue": "#2563eb",
        "brand-blue-light": "#3b82f6",
        "brand-purple": "#7c3aed",
        // Legacy aliases
        "brand-primary": "#2563eb",
        "brand-accent": "#2563eb",
        "brand-light": "#ffffff",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "glow-blue": "linear-gradient(135deg, #2563eb, #7c3aed)",
        "glow-dark": "linear-gradient(180deg, #050510 0%, #080820 100%)",
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(37, 99, 235, 0.35)",
        "glow-purple": "0 0 30px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [],
};
