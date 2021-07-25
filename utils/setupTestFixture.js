const fs = require('fs');
const path = require('path');
const JSDOM = require('JSDOM');

const rootDir = path.resolve(__dirname, '../');

const getPageHtml = filePath => {
  try {
    const html = fs.readFileSync(path.resolve(rootDir, filePath), 'utf8');
    return html.toString();
  } catch(err) {
    throw(new Error(`Cannot find page '${filePath}'. Have you built the site?`));
  }
};

/**
 * Boilerplate to load a page into the test document.
 *
 * Is available as a global within tests.
 *
 * @param {string} filePath path to the file under test (relative to rootDir)
 */
const loadPage = (filePath) => {
  if (!document || !document.documentElement) {
    throw(new Error('loadPage requires `document` to be defined'));
  }

  document.documentElement.innerHTML = getPageHtml(filePath);

  const query = sel => document.querySelector(sel);
  const queryAll = sel => Array.from(document.querySelectorAll(sel));

  return {
    query,
    queryAll,
    getTitle: () => query('title').textContent,
    getMeta: name => query(`meta[name="${name}"]`).getAttribute('content'),
    getStylesheets: () => queryAll('link[rel="stylesheet"]')
      .map(node => node.getAttribute('href')),
  };
};

global.loadPage = loadPage;
