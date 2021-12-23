const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  // purge: [],
  // mode: 'jit',
  // important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      colors: {
        cyan: colors.cyan,
        transparent: 'transparent',
      },
      backgroundImage: {
        'error-boundary': "url('https://i.imgur.com/oEUksmz.png')",
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'hover'],
      ringColor: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
      ringOffsetColor: ['hover', 'active'],
      borderWidth: ['last'],
      backgroundColor: ['active'],
      boxShadow: ['focus', 'focus-within'],
      textColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    // require('tailwindcss-children'),
    require('@tailwindcss/line-clamp'),

    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ' .no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
