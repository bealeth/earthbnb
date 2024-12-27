/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,isj,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#5a79ea',
        'gray2': '#7E8F9C',
      },
    },
  },
  plugins: [],
}

