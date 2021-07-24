module.exports = function(eleventyConfig) {
  return {
    templateFormats: [
      "md",
      "njk",
      "html",
    ],

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    dir: {
      input: "./src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};