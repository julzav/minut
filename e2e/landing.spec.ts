import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders hero heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Video meetings with AI-powered minutes'
    );
  });

  test('join button is disabled with no meeting code', async ({ page }) => {
    const joinButton = page.getByRole('button', { name: 'Join' });
    await expect(joinButton).toBeDisabled();
  });

  test('join button enables when meeting code is entered', async ({ page }) => {
    await page.getByPlaceholder('Enter meeting code').fill('abc-defg-hij');
    const joinButton = page.getByRole('button', { name: 'Join' });
    await expect(joinButton).toBeEnabled();
  });

  test('new meeting button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'New meeting' })).toBeVisible();
  });
});
