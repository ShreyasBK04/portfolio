/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#090A0D',
          secondary: '#111319',
          card: '#151820',
          elevated: '#1a1e28'
        },
        accent: {
          DEFAULT: '#FF7900',
          secondary: '#FFAA32',
          glow: 'rgba(255, 121, 0, 0.35)',
          muted: 'rgba(255, 121, 0, 0.12)'
        },
        content: {
          main: '#F5F5F5',
          secondary: '#A5A9B2',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(255, 121, 0, 0.25)',
        'glow-md': '0 0 30px rgba(255, 121, 0, 0.35)',
        'glow-lg': '0 0 50px rgba(255, 121, 0, 0.45)',
      },
      letterSpacing: {
        widest: '0.25em',
        tightest: '-0.04em',
      }
    },
  },
  plugins: [],
}
