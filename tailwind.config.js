/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'purple-glow': '0 0 20px 2px rgba(126, 34, 206, 0.35)'
      },
    },
  },
  plugins: [],
}
