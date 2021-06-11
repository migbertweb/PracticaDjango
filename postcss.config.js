const purgeCSS = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    purgeCSS({
      content: [
      './templates/**/*.html',
      './src/**/*.js',
      ],
      css: ['./src/**/*.css']
    })
  ]
}
