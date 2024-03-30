import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('default breadcrumbs for books', async ({ page }) => {
  await page.getByText('Books').click();

  const breadcrumb = page.locator('xng-breadcrumb');
  await expect(breadcrumb).toContainText('books');

  const breadcrumbList = page.locator('.xng-breadcrumb-list');
  await expect(breadcrumbList).not.toContainText('/');
});

test('breadcrumbs for book with id', async ({ page }) => {
  await page.getByText('Books').click();

  await page.locator('app-books .list-item a').first().click();
  await expect(page.locator('xng-breadcrumb')).toHaveText('books/1');

  await page.locator('app-book .list-item a').first().click();
  await expect(page.locator('xng-breadcrumb')).toHaveText('books/1/characters/2');
});

test('valid path via breadcrumb navigation', async ({ page }) => {
  await page.getByText('Books').click();
  await page.locator('app-books .list-item a').first().click();
  await page.locator('app-book .list-item a').first().click();

  await page.getByRole('link', { name: 'books/1' }).click();
  await expect(page).toHaveURL('/books/1');
});
