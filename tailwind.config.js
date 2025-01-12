/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        typing: 'typing 2s steps(30) 1s forwards, blink 0.75s step-end infinite',
        'gradient-move': 'gradientMove 5s ease infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: 'transparent' },
          '100%': { borderColor: 'black' },
        },
        gradientMove: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(90deg, #000000, #2d2a4a, #1e1836)',
      },
      fontFamily: {
        web: ["Web", "ui-serif"]
      }
    },
  },
  plugins: [],
}