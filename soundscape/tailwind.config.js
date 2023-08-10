/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#33E1ED',
        lightblue: '#88F7FF',
        gray: '#121212',
        'gray-transparent': 'rgba(18, 18, 18, 0.7)',
        lightgray: '#1E1E1E',
        red: '#CF6679'
      },
      spacing: {
        vsm: '5px',
        sm: '10px',
        md: '15px',
        lg: '30px',
        vlg: '60px',
        xl: '90px',
        xxl: '100px'
      },
      borderRadius: {
        sm: '15px',
        lg: '50px'
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif']
      },
      fontSize: {
        vvsm: '14px',
        vsm: '16px',
        sm: '20px',
        md: '32px',
        lg: '48px'
      },
      fontWeight: {
        normal: '400',
        bold: '700',
        black: '900'
      },
      backgroundImage: {
        gradient: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.7) 50%)'
      }
    },
  },
  plugins: [],
}
