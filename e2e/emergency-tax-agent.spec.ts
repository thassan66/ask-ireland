import { test, expect } from '@playwright/test';

test.describe('Synthetic Agent: Emergency Tax & Payroll Rebates', () => {
  test('navigates, checks mechanics, and tests TRN email template', async ({ page }) => {
    // 1. Visit emergency tax guide
    await page.goto('/emergency-tax');
    await expect(page).toHaveTitle(/Emergency Tax in Ireland/i);

    // Verify main heading
    const title = page.locator('h2:has-text("Emergency Tax Unblocker & Refund Guide")');
    await expect(title).toBeVisible();

    // Verify 40% PAYE + 8% USC alert box
    await expect(page.locator('text=40% PAYE + 8% USC')).toBeVisible();

    // 2. Test Step-by-Step Guidance cards
    await expect(page.locator('text=Employer\'s TRN')).toBeVisible();
    await expect(page.locator('text=Log into Revenue myAccount')).toBeVisible();
    await expect(page.locator('text=Add New Job under PAYE Services')).toBeVisible();
    await expect(page.locator('text=Revenue automatically sends the RPN')).toBeVisible();

    // 3. Test Email Template Copy Button
    const copyBtn = page.locator('button:has-text("Copy Email")');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(page.locator('text=Copied')).toBeVisible();
  });
});
