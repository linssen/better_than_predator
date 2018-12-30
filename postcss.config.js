const postCss = require('postcss-import')();
const tailwind = require('tailwindcss')('./tailwind-config.js');
const autoprefixer = require('autoprefixer')();

module.exports = {
  plugins: [postCss, tailwind, autoprefixer],
};
