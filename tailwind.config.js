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
        'resume-img': "url('/src/assets/images/resume.svg')",
        'line-chart': "url('/src/assets/images/line-chart.svg')",
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'hover'],
      ringColor: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
      width: ['hover', 'focus', 'group-hover'],
      ringOffsetColor: ['hover', 'active'],
      borderWidth: ['last'],
      backgroundColor: ['active'],
      boxShadow: ['focus', 'focus-within'],
      textColor: ['active'],
      justifyContent: ['group-hover'],
      padding: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    // require('@tailwindcss/aspect-ratio'),
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
