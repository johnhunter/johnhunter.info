const path = require('path');
const sass = require('sass');

const isProd = process.env.NODE_ENV === 'production';

const defaultSassOptions = {
  style: isProd ? 'compressed' : 'expanded',
  sourceMap: !isProd,
  sourceMapIncludeSources: true
}

/**
 * Registers a custom template to process sass files
 *
 * @param {Object} eleventyConfig
 * @param {Object} sass options
 */
module.exports = function(eleventyConfig, sassOptions = { loadPaths: [] }) {
  eleventyConfig.addTemplateFormats('scss');

  // Creates the extension for use
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    // compile each matching file
    compile: async function (inputContent, inputPath) {
      const { name, dir = '.' } = path.parse(inputPath);

      // ignore sass partials
      if(name.startsWith('_')) {
        return;
      }

      const loadPaths = [
        dir,
        this.config.dir.includes,
      ].concat(sassOptions.loadPaths);

      // use sync compile for performance reasons
      let result = sass.compileString(inputContent, {
        ...defaultSassOptions,
        ...sassOptions,
        loadPaths,
      });

      // render function - we don't use the template data
      return async (data) => {
        return result.css;
      };
    }
  });
};
