const eleventyLoadHtml = require('eleventy-load-html');
const eleventyLoadSass = require('eleventy-load-sass');
const eleventyLoadCss = require('eleventy-load-css');
const eleventyLoadFile = require('eleventy-load-file');

module.exports = function(isProduction) {
  return [
    {
      test: /\.(html|md|njk)$$/,
      loaders: [
        {
          loader: eleventyLoadHtml
        },
      ],
    },
    {
      test: /\.scss$/,
      loaders: [
        {
          loader: eleventyLoadSass,
          options: {
            sass: {
              outputStyle: isProduction ? 'compressed' : 'expanded',
            }
          }
        },
        {
          loader: eleventyLoadCss
        },
        {
          loader: eleventyLoadFile,
          options: {
            name: '[hash].css',
          },
        },
      ],
    },
  ];
};
