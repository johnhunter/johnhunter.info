const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyLoad = require('eleventy-load');
const sassLoaderRules = require('./utils/sassLoaderRules');

const isProduction = process.env.NODE_ENV === `production`;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addWatchTarget('src/sass/');

  eleventyConfig.addPlugin(eleventyLoad, {
    rules: [
      ...sassLoaderRules(isProduction),
    ]
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