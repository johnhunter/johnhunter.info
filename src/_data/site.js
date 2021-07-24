const package = require('../../package.json');

const site = {
  title: 'John Hunter',
  description: 'The personal blog of John Hunter',
  language: 'en',
  author: {
    ...package.author,
  },
};

module.exports = site;
