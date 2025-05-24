/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#2554bc',
        'blue-light': '#dee9fc',

        'gray': '#bbbbbb',
      },
      boxShadow: {
        'custom': '0 12px 40px rgba(0,0,0,0.12)',
      },
      screens: {
        sm: '576px',
        md: '768px',
        desktop: '1224px',
      },
    },
  },
  plugins: [],
}

