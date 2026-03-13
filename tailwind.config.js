/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2C5E3B",   // Your Deep Forest Green
          orange: "#F97316",  // Your Action Orange
          cream: "#FDFBF7",   // Your Soft Background
          light: "#F3F4F6",   // Your Input Box Grey
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // We need to import this font next
      },
    },
  },
  plugins: [],
}