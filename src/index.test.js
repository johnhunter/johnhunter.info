describe('Homepage', () => {
  let page;

  beforeEach(() => {
    page = loadPage('_site/index.html', { executeScripts: true });
  });

  it('has correct title', () => {
    expect(page.getTitle()).toBe('johnhunter.info');
    expect(page.getMeta('description')).toBe(
      'The personal blog of John Hunter'
    );
  });

  it('has a stylesheet', () => {
    const stylesheets = page.getStylesheets();
    expect(stylesheets).toHaveLength(1);
    expect(stylesheets[0]).toMatch(/^sass\/(.*).css$/);
  });

  it('has main content', () => {
    const main = page.query('main');
    expect(main.textContent).toEqual(expect.stringContaining(
      'Nothing to see here for now, just a wave'
    ));
  });
});
