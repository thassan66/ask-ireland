import { test, expect } from '@playwright/test';

test.describe('Synthetic Agent: Citizenship Calculator & Form 8 Audit', () => {
  test('navigates, switches routes, applies presets, and audits statutory calculations', async ({ page }) => {
    // 1. Visit calculator
    await page.goto('/calculator');
    await expect(page).toHaveTitle(/Irish Citizenship Calculator/i);

    // Verify main statutory heading is present
    const heading = page.locator('h2:has-text("Irish Citizenship & Residency Hub")');
    await expect(heading).toBeVisible();

    // 2. Test Route Switching (Standard -> Spouse -> FBR -> EU)
    // Switch to Spouse route (Section 15A)
    const spouseTab = page.locator('button:has-text("Spouse")').first();
    await spouseTab.click();
    await expect(page.locator('text=Section 15A Route: Spouse / Civil Partner of Irish Citizen')).toBeVisible();

    // Switch to Foreign Births Register (FBR)
    const fbrTab = page.locator('button:has-text("Grandparent / FBR")');
    await fbrTab.click();
    await expect(page.locator('text=Irish Citizenship by Descent (Foreign Births Register)')).toBeVisible();

    // Switch back to Standard 5-Year Naturalisation
    const standardTab = page.locator('button:has-text("Standard")').first();
    await standardTab.click();
    await expect(page.locator('text=Section 15 Route: Standard Adult Naturalisation by Residence')).toBeVisible();

    // 3. Apply 1-Click Preset: Critical Skills (2y Stamp 1 + 3y Stamp 4)
    const csepPresetBtn = page.locator('button:has-text("Critical Skills")');
    await csepPresetBtn.click();

    // 4. Verify Celtic Pine Assessment Card updates
    const reckonableDisplay = page.locator('text=Official Reckonable Residence Audit');
    await expect(reckonableDisplay).toBeVisible();

    // Verify Statutory 365-Day Residence Battery renders
    const batteryHeading = page.locator('text=Statutory Year-by-Year Residence Battery');
    await expect(batteryHeading).toBeVisible();
    await expect(page.locator('text=5 Statutory 365-Day Blocks')).toBeVisible();

    // 5. Verify Passport Stamp Badges appear
    const stampBadges = page.locator('text=Stamp 4');
    await expect(stampBadges.first()).toBeVisible();

    // 6. Test Collapsible Sections
    // Expand Fees and Timelines
    const feeToggle = page.locator('button:has-text("Official Fees & 2026 ISD Processing Timeline")');
    await feeToggle.click();
    await expect(page.locator('text=€175 Fee')).toBeVisible();
    await expect(page.locator('text=€950 Certificate')).toBeVisible();

    // Expand Document Pack Checklist
    const docPackToggle = page.locator('button:has-text("Form 8 Submission Document Pack Checklist")');
    await docPackToggle.click();
    await expect(page.locator('text=Certified Full Passport Copies')).toBeVisible();

    // 7. Verify Form 8 Print Schedule exists in DOM (for PDF / print export)
    const printReport = page.locator('.print-only');
    await expect(printReport).toBeAttached();
  });
});
