/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        base: "#0C0C0C",
        ice: "#D7E2EA",
        paper: "#FFFFFF",
      },
      fontFamily: {
        kanitLight: ["Kanit_300Light"],
        kanit: ["Kanit_400Regular"],
        kanitMedium: ["Kanit_500Medium"],
        kanitBlack: ["Kanit_900Black"],
      },
    },
  },
  plugins: [],
};