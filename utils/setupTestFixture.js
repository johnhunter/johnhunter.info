const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const rootDir = process.cwd();
const { dir } = require(path.resolve(rootDir, '.eleventy.js'));

const getPageHtml = (filePath) => {
  try {
    const html = fs.readFileSync(path.resolve(rootDir, filePath), 'utf8');
    return html.toString();
  } catch (err) {
    throw new Error(`Cannot find page '${filePath}'. Have you built the site?`);
  }
};

const createDomfromHtml = (html, options) =>
  new JSDOM(html, options).window.document;

const copyElementAttrs = (source, target) => {
  Array.from(source.attributes || []).forEach(({ name, value }) => {
    target.setAttribute(name, value);
  });
};

/**
 * Boilerplate to load a page from the site output into the test document.
 * Is available as a global within tests.
 *
 * Note: <script> tags are not evaluated
 *
 * @param {string} filePath path to the file under test
 * @returns {{
 *  query: function,
 *  queryAll: function,
 *  getAttributes: function,
 *  getTitle: function,
 *  getMeta: function,
 *  getLinkHref: function
 * }}
 */
const loadPage = (filePath) => {
  if (!document || !document.documentElement) {
    throw new Error('loadPage requires `document` to be defined');
  }

  const htmlStr = getPageHtml(path.resolve(dir.output, filePath));
  document.documentElement.innerHTML = htmlStr;

  const dom = createDomfromHtml(htmlStr);
  copyElementAttrs(dom.documentElement, document.documentElement);

  const query = (sel) => document.querySelector(sel);
  const queryAll = (sel) => Array.from(document.querySelectorAll(sel));
  const getAttrs = (el) => {
    if (!el.hasAttributes()) {
      return {};
    }

    return Array.from(el.attributes).reduce((acc, attr) => {
      if (attr.name) {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});
  };

  return {
    query,
    queryAll,
    getAttrs,
    getTitle: () => query('title').textContent,
    getMeta: (name) => query(`meta[name="${name}"]`).getAttribute('content'),
    getLinkHref: (rel = 'stylesheet') =>
      queryAll(`link[rel="${rel}"]`).map((node) => node.getAttribute('href')),
  };
};

global.loadPage = loadPage;
