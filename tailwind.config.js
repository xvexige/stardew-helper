/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sv-panel': '#f4ece4', // 星露谷风格的米色面板
        'sv-border': '#542d1b', // 经典的棕色边框
      }
    },
  },
  plugins: [],
}