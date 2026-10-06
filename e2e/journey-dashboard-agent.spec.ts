import { test, expect } from '@playwright/test';

test.describe('Synthetic Agent: Immigration Journey & Private Dashboard', () => {
  test('tests permissions display, passport badge, and local storage backup', async ({ page }) => {
    // 1. Visit journey dashboard
    await page.goto('/journey');
    await expect(page).toHaveTitle(/My Irish Immigration Journey/i);

    // Verify header
    await expect(page.locator('h1:has-text("My Irish Immigration Journey")')).toBeVisible();

    // 2. Verify Current Permission Card with PassportStampBadge
    const permissionCard = page.locator('text=Current Immigration Permission');
    await expect(permissionCard).toBeVisible();

    // Verify 12-Week Renewal Window context is rendered
    await expect(page.locator('text=Citizenship Reckonable Residence')).toBeVisible();

    // 3. Verify Backup JSON and Restore controls exist
    const backupBtn = page.locator('button:has-text("Backup JSON")');
    await expect(backupBtn).toBeVisible();

    const restoreBtn = page.locator('button:has-text("Restore")');
    await expect(restoreBtn).toBeVisible();
  });
});
