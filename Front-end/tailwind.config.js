/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'softBlack': '#151515',
        'black' : '#000000',
      },
      screens: {
        'xs': '375px', // Mobil genişlik
        'sm': '515px', // Mobil genişlik
        'md': '900px', // Tablet genişlik
        'lg': '1024px', // Laptop genişlik
        'xl': '1440px', // Masaüstü genişlik
      },
    }
  },
  plugins: []
}
