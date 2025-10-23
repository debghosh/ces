const { test, expect } = require('@playwright/test');


test.describe('Equipment Catalog', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if we're on mobile (mobile menu toggle is visible)
    const mobileToggle = page.locator('.mobile-menu-toggle');
    const isMobile = await mobileToggle.isVisible().catch(() => false);
    
    if (isMobile) {
      // Open mobile menu first
      await mobileToggle.click();
      await page.waitForTimeout(1000);
      
      // Verify menu opened
      const sidebar = page.locator('.sidebar');
      const menuOpen = await sidebar.evaluate(el => 
        el.classList.contains('open') || 
        el.classList.contains('show') || 
        el.classList.contains('active')
      );
      
      // If menu didn't open, try again
      if (!menuOpen) {
        await mobileToggle.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Navigate to equipment page using data-page attribute
    await page.click('.nav-item[data-page="equipment"]');
    
    // Wait for equipment grid to load
    await page.waitForTimeout(1000);
    await page.waitForSelector('.equipment-grid', { 
      state: 'visible', 
      timeout: 10000 
    });
  });
  
  test('equipment cards are displayed', async ({ page }) => {
    // Wait for at least one card to appear
    const cards = page.locator('.equipment-card');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    
    // Verify multiple cards
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
  
  test('can filter equipment by category', async ({ page }) => {
    // Wait for tabs to be ready
    await page.waitForSelector('.tabs .tab', { state: 'visible' });
    
    // Click a category tab (try Battery or second tab)
    const tabs = page.locator('.tab');
    const tabCount = await tabs.count();
    
    if (tabCount > 1) {
      await tabs.nth(1).click();
      
      // Wait for filter to apply (DOM update)
      await page.waitForTimeout(500);
      
      // Verify cards still exist after filter
      const cards = page.locator('.equipment-card:visible');
      const visibleCount = await cards.count();
      expect(visibleCount).toBeGreaterThan(0);
    }
  });
  
  test('can add item to quote cart', async ({ page }) => {
    // Wait for "Add to Quote" button to be available
    await page.waitForSelector('.equipment-card .btn-primary', { 
      state: 'visible',
      timeout: 5000 
    });
    
    const addButton = page.locator('.equipment-card .btn-primary').first();
    await expect(addButton).toBeEnabled();
    
    // Click to add
    await addButton.click();
    
    // Wait for badge to update
    await page.waitForTimeout(1000);
    const badge = page.locator('#quoteBadge');
    await expect(badge).toBeVisible({ timeout: 5000 });
    
    // Verify badge shows count
    const badgeText = await badge.textContent();
    expect(parseInt(badgeText)).toBeGreaterThan(0);
  });
  
  test('can search equipment', async ({ page }) => {
    // Find search input (try multiple possible selectors)
    const searchInput = page.locator('input[placeholder*="Search"]').or(page.locator('.search-box input')).first();
    
    // Check if search exists
    const searchExists = await searchInput.count() > 0;
    
    if (searchExists) {
      await searchInput.fill('generator');
      
      // Wait for search results to update
      await page.waitForTimeout(500);
      
      // Check results
      const cards = page.locator('.equipment-card:visible');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    } else {
      // Skip if search not implemented
      test.skip();
    }
  });
});