/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        accent: "#FACC15",
        baseBg: "#F9FAFB",
        textMain: "#111827",
      },
      fontFamily: {
        heading: ['"Sora"', "sans-serif"],
        body: ['"Space Grotesk"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 45px -30px rgba(79, 70, 229, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
