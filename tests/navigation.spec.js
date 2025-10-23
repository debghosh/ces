const { test, expect } = require('@playwright/test');


test.describe('Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });
  
  test('can navigate to equipment page', async ({ page }) => {
    // Check if we're on mobile viewport
    const mobileToggle = page.locator('.mobile-menu-toggle');
    const isMobile = await mobileToggle.isVisible().catch(() => false);
    
    if (isMobile) {
      // Open mobile menu first
      await mobileToggle.click();
      await page.waitForTimeout(1000);
    }
    
    // Click equipment nav item using data-page attribute
    await page.click('.nav-item[data-page="equipment"]');
    
    // Wait for page to load and template to render
    await page.waitForTimeout(1000);
    await page.waitForSelector('.equipment-grid', { 
      state: 'visible', 
      timeout: 10000 
    });
    
    // Verify equipment page is active
    await expect(page.locator('.nav-item[data-page="equipment"]')).toHaveClass(/active/);
    await expect(page.locator('.equipment-grid')).toBeVisible();
  });
  
  test('can navigate to quotes page', async ({ page }) => {
    // Check if we're on mobile viewport
    const mobileToggle = page.locator('.mobile-menu-toggle');
    const isMobile = await mobileToggle.isVisible().catch(() => false);
    
    if (isMobile) {
      // Open mobile menu first
      await mobileToggle.click();
      await page.waitForTimeout(1000);
    }
    
    await page.click('.nav-item[data-page="quotes"]');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('.nav-item[data-page="quotes"]')).toHaveClass(/active/);
  });
  
  test.skip('mobile menu opens and closes', async ({ page }) => {
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const sidebar = page.locator('.sidebar');
    const menuToggle = page.locator('.mobile-menu-toggle');
    const firstNavItem = page.locator('.nav-item').first();
    
    // Wait for mobile menu toggle to appear
    await expect(menuToggle).toBeVisible({ timeout: 10000 });
    
    // Open menu
    await menuToggle.click();
    await page.waitForTimeout(2000);
    
    // Verify menu is open by checking if nav items are now visible/clickable
    try {
      await expect(firstNavItem).toBeVisible({ timeout: 5000 });
      // Menu is successfully open
    } catch (e) {
      // Fallback: check if sidebar has open class
      const hasOpenClass = await sidebar.evaluate(el => 
        el.classList.contains('open') || 
        el.classList.contains('show') || 
        el.classList.contains('active')
      );
      expect(hasOpenClass).toBe(true);
    }
    
    // Close menu
    const overlay = page.locator('.sidebar-overlay');
    const overlayVisible = await overlay.isVisible().catch(() => false);
    
    if (overlayVisible) {
      await overlay.click();
    } else {
      await menuToggle.click();
    }
    
    await page.waitForTimeout(2000);
    
    // Verify menu is closed - nav items should be hidden or sidebar should not have open class
    const hiddenAfter = await firstNavItem.isHidden().catch(() => false);
    const hasOpenClass = await sidebar.evaluate(el => 
      el.classList.contains('open') || 
      el.classList.contains('show') || 
      el.classList.contains('active')
    );
    
    // Pass if nav item is hidden OR sidebar doesn't have open class
    expect(hiddenAfter || !hasOpenClass).toBe(true);
  });
});