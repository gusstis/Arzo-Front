/** @type {import('tailwindcss').Config} */
//module.exports = {
//  content: [
//    "./pages/**/*.{js,ts,jsx,tsx}",
//    "./components/**/*.{js,ts,jsx,tsx}",
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
//}

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}",
            './public/**/*.html',
            ],
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}