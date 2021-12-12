const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      maxWidth: {
        '1/2': '50%',
      },
      colors: {
        bush: {
          DEFAULT: '#d99a3d',
          dark: '#BB7F25'
        },
        sunset: {
          light: '#e18174',
          DEFAULT: '#E05745',
          dark: '#b83928',
          darker: '#862a1d',
          darkest: '#541a12'
        },
        aqua: {
          DEFAULT: '#72B8CD',
          dark: '#437889',
          darker: '#284852',
          darkest: '#142429'
        },
        steel: {
          DEFAULT: '#1a1716'
        }
      },
      fontSize: {
        '10xl': '11rem'
      },
      fontFamily: {
        'heading': ['Brannt Chiseled', 'Helvetica', 'Arial', 'sans-serif' ],
        'subheading': ['Brannt', 'Helvetica', 'Arial', 'sans-serif' ],
        // 'handwriting': ["'Baloo 2'", 'cursive']
        'handwriting': ['Delius Unicase', 'cursive'],
        'sans': ['Noto Sans', 'sans-serif']
      }
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addUtilities, theme, config, e }) => {
      addUtilities(
        Object.entries(theme('spacing')).map(([variant, space]) => ({
          [`.${e(`basis-${variant}`)}`]: { 'flex-basis': space }
        }))
      )
    })
  ],
};
