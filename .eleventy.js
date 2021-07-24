const eleventyLoad = require('eleventy-load');
const eleventyLoadHtml = require('eleventy-load-html');
const eleventyLoadSass = require('eleventy-load-sass');
const eleventyLoadCss = require('eleventy-load-css');
const eleventyLoadFile = require('eleventy-load-file');

module.exports = function(eleventyConfig) {

  // Process SASS files
  eleventyConfig.addWatchTarget('src/sass/');
  eleventyConfig.addPlugin(eleventyLoad, {
    rules: [
      {
        test: /\.(html|md|njk)$$/,
        loaders: [
          { loader: eleventyLoadHtml },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          { loader: eleventyLoadSass },
          { loader: eleventyLoadCss },
          {
            loader: eleventyLoadFile,
            options: {
              name: '[hash].css',
            },
          },
        ],
      },
    ],
  });

  return {
    templateFormats: ['md', 'njk', 'html'],

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    // dataTemplateEngine: 'njk',

    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};