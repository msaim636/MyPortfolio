/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        paper: "#F5F3EF",
        cream: "#FBFAF8",
        accent: "#FF4B1F",
        "accent-deep": "#E23D12",
        muted: "#8A877F",
        line: "#E4E0D8",
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
