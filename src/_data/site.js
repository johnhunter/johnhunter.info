const pkg = require('../../package.json');

const site = {
  title: 'John Hunter',
  description: 'The personal blog of John Hunter',
  language: 'en',
  author: {
    ...pkg.author,
  },
};

module.exports = site;
