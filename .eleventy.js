const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const registerSassTemplate = require('./utils/registerSassTemplate');

const isProduction = process.env.NODE_ENV === `production`;

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  registerSassTemplate(eleventyConfig);
  eleventyConfig.addWatchTarget('src/sass/');

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
