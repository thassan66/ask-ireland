import { test, expect } from '@playwright/test';

test.describe('Synthetic Agent: 150-Point Citizenship Scorecard', () => {
  test('navigates, toggles year tabs, and audits evidence points', async ({ page }) => {
    // 1. Visit scorecard
    await page.goto('/scorecard');
    await expect(page).toHaveTitle(/Citizenship Scorecard Calculator/i);

    // Verify header
    await expect(page.locator('h2:has-text("Citizenship 150-Point Residence Scorecard")')).toBeVisible();

    // 2. Test Year Selector Tabs (Year 1 to Year 5)
    await expect(page.locator('button:has-text("Year 1")')).toBeVisible();
    await expect(page.locator('button:has-text("Year 5")')).toBeVisible();

    // Switch to Year 2
    const yr2Btn = page.locator('button:has-text("Year 2")');
    await yr2Btn.click();

    // 3. Verify Score breakdown gauge is present
    await expect(page.locator('text=Type A (Primary):')).toBeVisible();
    await expect(page.locator('text=Type B (Supporting):')).toBeVisible();

    // 4. Test document selection toggle
    const p60Item = page.locator('text=Revenue Employment Detail Summary (P60)').first();
    await expect(p60Item).toBeVisible();
  });
});
