/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dak: {
          navy: {
            950: '#070C18',
            900: '#0B132B',
            800: '#1C2541',
            700: '#3A506B',
          },
          saffron: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            400: '#FB923C',
            500: '#F97316',
            600: '#EA580C',
            700: '#C2410C',
          },
          emerald: {
            500: '#10B981',
            600: '#059669',
            700: '#047857',
          },
          gold: {
            400: '#FBBF24',
            500: '#F59E0B',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
