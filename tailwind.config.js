/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#0f172a",
        "brand-primary": "var(--theme-primary, #6366f1)",
        "brand-accent": "var(--theme-accent, #c084fc)",
        "brand-light": "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
