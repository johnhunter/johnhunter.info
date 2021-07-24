const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyLoad = require('eleventy-load');
const eleventyLoadHtml = require('eleventy-load-html');
const eleventyLoadSass = require('eleventy-load-sass');
const eleventyLoadCss = require('eleventy-load-css');
const eleventyLoadFile = require('eleventy-load-file');

const isProduction = process.env.NODE_ENV === `production`;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

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
          {
            loader: eleventyLoadSass,
            options: {
              sass: {
                outputStyle: isProduction ? 'compressed' : 'expanded',
              }
            }
          },
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