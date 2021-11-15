module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#22292f',
      },
      fontFamily: {
        sans: [
          'Pathway Gothic One',
          'Helvetica Neue',
          'sans-serif',
        ],
        cursive: [
          'Shadows Into Light',
          'cursive',
          'serif',
        ],
      },
      fill: {
        white: 'white',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
