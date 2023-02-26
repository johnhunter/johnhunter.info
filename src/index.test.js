const test = require('ava');
const loadPage = require('../utils/loadPage');

const page = loadPage('./index.html');

test('html is correct langauge', (t) => {
  t.is(page.getRootAttrs().lang, 'en');
});

test('header has correct meta information', (t) => {
  t.is(page.getTitle(), 'johnhunter.info');
  t.is(page.getMeta('description'), 'The personal blog of John Hunter');
});

test('header has a stylesheet', (t) => {
  const stylesheets = page.getLinkHrefs('stylesheet');
  t.is(stylesheets.length, 1);
  t.regex(stylesheets[0], /^sass\/styles.css$/);
});

test('has main content', (t) => {
  const main = page.query('main');
  t.true(page.containsText(main, 'Nothing to see here for now, just a wave'));
});
