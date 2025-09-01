/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#0ea5e9', // sky-500
          50: '#f0f9ff',      // sky-50
          100: '#e0f2fe',     // sky-100
          200: '#bae6fd',     // sky-200
          300: '#7dd3fc',     // sky-300
          400: '#38bdf8',     // sky-400
          500: '#0ea5e9',     // sky-500
          600: '#0284c7',     // sky-600
          700: '#0369a1',     // sky-700
          800: '#075985',     // sky-800
          900: '#0c4a6e',     // sky-900
        },
      },
    },
  },
  plugins: [],
} 