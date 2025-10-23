const { test, expect } = require('@playwright/test');


test.describe('Smoke Tests', () => {
  
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for actual content, not just network
    await page.waitForSelector('.logo', { state: 'visible' });
    
    // Check the title
    await expect(page).toHaveTitle('CES Power Pro - Customer Portal');
    
    // Verify logo is visible
    await expect(page.locator('.logo')).toBeVisible();
  });
  
  test('all modules load without errors', async ({ page }) => {
    await page.goto('/');
    
    // Wait for key elements that indicate page is ready
    await page.waitForSelector('.sidebar', { state: 'visible' });
    await page.waitForSelector('.header', { state: 'visible' });
    
    // Verify they're actually visible
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
  });
  
  test('navigation items are present', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.sidebar', { state: 'visible' });
    
    // Check nav items using text content (more reliable than data attributes)
    await expect(page.locator('.nav-item', { hasText: 'Dashboard' })).toBeVisible();
    await expect(page.locator('.nav-item', { hasText: 'Equipment Catalog' })).toBeVisible();
    await expect(page.locator('.nav-item', { hasText: 'Quick Quote' })).toBeVisible();
    await expect(page.locator('.nav-item', { hasText: 'My Events' })).toBeVisible();
  });
});
