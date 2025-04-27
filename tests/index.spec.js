// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has page meta info', async ({ page }) => {
    await expect(page).toHaveTitle(/johnhunter.info/);
    await expect(page.locator('css=html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('css=meta[name=description]')).toHaveAttribute(
      'content',
      'The personal blog of John Hunter'
    );
  });

  test('has the font stylesheet', async ({ page }) => {
    await expect(
      page.locator('css=link[rel="stylesheet"]').first()
    ).toHaveAttribute('href', /^sass\/styles.css$/);
  });

  test('has main content', async ({ page }) => {
    await expect(page.getByRole('main')).toContainText(
      'Nothing to see here for now, just a wave'
    );
  });
});
