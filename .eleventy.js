const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventySass = require('@11tyrocks/eleventy-plugin-sass-lightningcss');

const dir = {
  input: 'src',
  includes: '_includes',
  data: '_data',
  output: '_site',
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(eleventySass);

  eleventyConfig.addPassthroughCopy('.well-known');

  return {
    dir,
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};

module.exports.dir = dir;
