describe('Homepage', () => {
  let page;

  beforeEach(() => {
    page = loadPage('./index.html');
  });

  it('html is correct langauge', () => {
    const attrs = page.getAttrs(document.documentElement);
    expect(attrs.lang).toBe('en');
  });

  it('header has correct meta information', () => {
    expect(document.title).toBe('johnhunter.info');
    expect(page.getTitle()).toBe('johnhunter.info');
    expect(page.getMeta('description')).toBe(
      'The personal blog of John Hunter'
    );
  });

  it('header has a stylesheet', () => {
    const stylesheets = page.getLinkHref();
    expect(stylesheets).toHaveLength(1);
    expect(stylesheets[0]).toMatch(/^\/assets\/(.*).css$/);
  });

  it('has main content', () => {
    const main = page.query('main');
    expect(main.textContent).toEqual(
      expect.stringContaining('Nothing to see here for now, just a wave')
    );
  });
});
