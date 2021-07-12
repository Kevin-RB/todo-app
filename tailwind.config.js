const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './public/**/*.js'
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
