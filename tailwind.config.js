const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  // purge: [],
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      ringColor: ['hover', 'active'],
      ringOffsetColor: ['hover', 'active'],
      borderWidth: ['last'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/typography'),
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
