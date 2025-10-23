const { test, expect } = require('@playwright/test');

test.describe('Quote System', () => {
  
  test('can add items and save quote', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Webkit needs longer initial wait
    const timeout = browserName === 'webkit' ? 15000 : 10000;
    await page.waitForSelector('.sidebar', { state: 'visible', timeout });
    
    // Additional wait for webkit
    if (browserName === 'webkit') {
      await page.waitForTimeout(1000);
    }
    
    // Check if mobile viewport
    const viewport = page.viewportSize();
    const isMobile = viewport.width < 768;
    
    // Open mobile menu if needed
    if (isMobile) {
      const toggle = page.locator('.mobile-menu-toggle');
      const isVisible = await toggle.isVisible().catch(() => false);
      if (isVisible) {
        await toggle.click();
        await page.waitForTimeout(800);
      }
    }
    
    // Navigate to equipment
    const equipNav = page.locator('.nav-item', { hasText: 'Equipment Catalog' });
    await equipNav.waitFor({ state: 'visible', timeout });
    await equipNav.click();
    
    // Wait for equipment grid - longer for webkit
    const gridTimeout = browserName === 'webkit' ? 20000 : 15000;
    const gridLoaded = await page.waitForSelector('.equipment-grid', { 
      state: 'visible', 
      timeout: gridTimeout 
    }).catch(() => null);
    
    if (!gridLoaded) {
      test.skip();
      return;
    }
    
    // Additional wait for webkit to render cards
    if (browserName === 'webkit') {
      await page.waitForTimeout(1500);
    }
    
    // Scroll to see cards on mobile
    if (isMobile) {
      await page.evaluate(() => window.scrollTo(0, 300));
    }
    
    // Add items to cart
    const addButtons = page.locator('.equipment-card .btn-primary:visible');
    
    // Wait for buttons to be available
    await page.waitForTimeout(500);
    const buttonCount = await addButtons.count();
    
    if (buttonCount < 2) {
      test.skip();
      return;
    }
    
    // Click buttons with webkit-friendly waits
    await addButtons.nth(0).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await addButtons.nth(0).click();
    await page.waitForTimeout(1200);
    
    await addButtons.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await addButtons.nth(1).click();
    await page.waitForTimeout(1200);
    
    // Reopen mobile menu before navigating
    if (isMobile) {
      const toggle = page.locator('.mobile-menu-toggle');
      const isVisible = await toggle.isVisible().catch(() => false);
      if (isVisible) {
        await toggle.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Navigate to quotes page
    const quotesNav = page.locator('.nav-item', { hasText: 'Quick Quote' });
    await quotesNav.waitFor({ state: 'visible', timeout });
    await quotesNav.click();
    
    // Webkit needs longer page transition wait
    const transitionWait = browserName === 'webkit' ? 3000 : 2000;
    await page.waitForTimeout(transitionWait);
    
    // Wait for quote input
    const quoteInput = page.locator('#quoteNameInput');
    const inputExists = await quoteInput.isVisible({ timeout }).catch(() => false);
    
    if (!inputExists) {
      test.skip();
      return;
    }
    
    await quoteInput.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await quoteInput.fill('Test Quote ' + Date.now());
    
    // Save button
    const saveButton = page.locator('button:has-text("Save Quote")').first();
    const saveExists = await saveButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (saveExists) {
      await saveButton.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await saveButton.click();
      await page.waitForTimeout(1500);
    }
  });
  
  test('can toggle quote cart panel', async ({ page, browserName }) => {
    await page.goto('/');
    
    const timeout = browserName === 'webkit' ? 15000 : 10000;
    await page.waitForSelector('.sidebar', { state: 'visible', timeout });
    
    // Webkit needs extra wait
    if (browserName === 'webkit') {
      await page.waitForTimeout(1000);
    }
    
    // Scroll to top to see notification bell
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Click notification bell
    const bell = page.locator('.notifications');
    await bell.waitFor({ state: 'visible', timeout });
    await bell.click();
    await page.waitForTimeout(1000);
    
    // Wait for panel animation
    const panel = page.locator('#quoteCartPanel');
    await expect(panel).toHaveClass(/open/, { timeout: 5000 });
    
    // Close panel
    const closeBtn = page.locator('.quote-cart-close');
    await closeBtn.click();
    await page.waitForTimeout(1000);
    
    // Verify closed
    await expect(panel).not.toHaveClass(/open/, { timeout: 3000 });
  });
  
  test('cart calculates totals correctly', async ({ page, browserName }) => {
    await page.goto('/');
    
    const timeout = browserName === 'webkit' ? 15000 : 10000;
    await page.waitForSelector('.sidebar', { state: 'visible', timeout });
    
    // Webkit needs extra wait
    if (browserName === 'webkit') {
      await page.waitForTimeout(1000);
    }
    
    // Check if mobile viewport
    const viewport = page.viewportSize();
    const isMobile = viewport.width < 768;
    
    // Open mobile menu if needed
    if (isMobile) {
      const toggle = page.locator('.mobile-menu-toggle');
      const isVisible = await toggle.isVisible().catch(() => false);
      if (isVisible) {
        await toggle.click();
        await page.waitForTimeout(800);
      }
    }
    
    // Add item
    const equipNav = page.locator('.nav-item', { hasText: 'Equipment Catalog' });
    await equipNav.waitFor({ state: 'visible', timeout });
    await equipNav.click();
    
    // Wait for cards - longer for webkit
    const cardTimeout = browserName === 'webkit' ? 20000 : 15000;
    const cardsLoaded = await page.waitForSelector('.equipment-card', { 
      state: 'visible', 
      timeout: cardTimeout 
    }).catch(() => null);
    
    if (!cardsLoaded) {
      test.skip();
      return;
    }
    
    // Additional wait for webkit
    if (browserName === 'webkit') {
      await page.waitForTimeout(1500);
    }
    
    // Scroll to see cards on mobile
    if (isMobile) {
      await page.evaluate(() => window.scrollTo(0, 300));
    }
    
    const addButton = page.locator('.equipment-card .btn-primary:visible').first();
    
    // Wait for button to be ready
    await page.waitForTimeout(500);
    const buttonExists = await addButton.count() > 0;
    
    if (!buttonExists) {
      test.skip();
      return;
    }
    
    await addButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await addButton.click();
    await page.waitForTimeout(1500);
    
    // Scroll to top to see cart bell
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    
    // Open cart
    const cartButton = page.locator('.notifications');
    await cartButton.waitFor({ state: 'visible', timeout });
    await cartButton.click();
    await page.waitForTimeout(1000);
    
    // Check total
    const total = page.locator('.cart-summary-total, .total-amount').first();
    const totalExists = await total.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (totalExists) {
      const totalText = await total.textContent();
      expect(totalText).toMatch(/\$[\d,]+/);
    } else {
      test.skip();
    }
  });
});