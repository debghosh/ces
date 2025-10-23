// Diagnostic test to figure out what's wrong with the mobile menu test
// Replace your failing test temporarily with this to see what's happening

const { test, expect } = require('@playwright/test');

test.describe('Mobile Menu Debug', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('diagnose mobile menu issue', async ({ page }) => {
    console.log('\n========== STARTING DIAGNOSIS ==========\n');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 1. Check if mobile toggle exists
    console.log('1. Checking for mobile-menu-toggle...');
    const toggleCount = await page.locator('.mobile-menu-toggle').count();
    console.log(`   Found ${toggleCount} toggle(s)`);
    
    if (toggleCount === 0) {
      console.log('   ❌ PROBLEM: No mobile-menu-toggle found!');
      console.log('   Try these selectors instead:');
      const alternatives = ['.menu-toggle', '.hamburger', '[data-toggle="menu"]', '.nav-toggle'];
      for (const sel of alternatives) {
        const count = await page.locator(sel).count();
        if (count > 0) console.log(`   ✅ Found ${count} element(s) with selector: ${sel}`);
      }
      return;
    }
    
    const menuToggle = page.locator('.mobile-menu-toggle');
    
    // 2. Check if it's visible
    console.log('2. Checking if toggle is visible...');
    const isVisible = await menuToggle.isVisible().catch(() => false);
    console.log(`   Visible: ${isVisible}`);
    
    if (!isVisible) {
      console.log('   ❌ PROBLEM: Toggle exists but not visible!');
      return;
    }
    
    // 3. Try clicking it
    console.log('3. Clicking the toggle...');
    await menuToggle.click();
    console.log('   ✅ Click successful');
    
    await page.waitForTimeout(2000);
    
    // 4. Check sidebar
    console.log('4. Checking sidebar after click...');
    const sidebarCount = await page.locator('.sidebar').count();
    console.log(`   Found ${sidebarCount} sidebar(s)`);
    
    if (sidebarCount > 0) {
      const sidebar = page.locator('.sidebar');
      const sidebarInfo = await sidebar.evaluate(el => {
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        return {
          classes: el.className,
          display: styles.display,
          visibility: styles.visibility,
          transform: styles.transform,
          left: rect.left,
          right: rect.right,
          width: rect.width
        };
      });
      console.log('   Sidebar state:', JSON.stringify(sidebarInfo, null, 2));
    }
    
    // 5. Check nav items
    console.log('5. Checking nav items...');
    const navItemCount = await page.locator('.nav-item').count();
    console.log(`   Found ${navItemCount} nav item(s)`);
    
    if (navItemCount > 0) {
      const firstNav = page.locator('.nav-item').first();
      const navVisible = await firstNav.isVisible().catch(() => false);
      const navHidden = await firstNav.isHidden().catch(() => true);
      console.log(`   First nav item - visible: ${navVisible}, hidden: ${navHidden}`);
    }
    
    // 6. Check for overlay
    console.log('6. Checking for overlay...');
    const overlayCount = await page.locator('.sidebar-overlay').count();
    console.log(`   Found ${overlayCount} overlay(s)`);
    
    if (overlayCount > 0) {
      const overlay = page.locator('.sidebar-overlay');
      const overlayVisible = await overlay.isVisible().catch(() => false);
      console.log(`   Overlay visible: ${overlayVisible}`);
    }
    
    console.log('\n========== DIAGNOSIS COMPLETE ==========\n');
    console.log('Review the output above to understand what\'s happening with your mobile menu.');
  });
});