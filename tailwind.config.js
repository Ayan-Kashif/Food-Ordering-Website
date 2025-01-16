/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(257deg, #e4002b 42%, #ff4065 52%, #e4002b 64%)',
      },
      screens: {
        
        "11xs":"0px",
        "12xs":"370px",
        "10xs":"380px",
        "9xs":"390px",
        "8xs":"400px",
        "xxxxxxxs":"410px",
        "xxxxxxs":"420px",
        "xxxxxs":"430px",
        'xxxxs':'450px',
        'xxxs':'460px',
        'xxs':'480px',
        "2xs":"520px",
        'xs': '545px', // Custom breakpoint for small screens
        'xxl': '1200px', // Custom breakpoint for very large screens
      },
    },
  },
  plugins: [
    require('autoprefixer'),
    
    // Add other PostCSS plugins here if needed
  ],
};
