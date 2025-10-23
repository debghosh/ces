// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  
  // Run tests in parallel for speed
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests twice on CI
  retries: process.env.CI ? 2 : 0,
  
  // Limit workers on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: 'html',
  
  use: {
    // Base URL for your app
    baseURL: 'http://localhost:8080',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on retry
    video: 'retain-on-failure',
    
    // Browser viewport
    viewport: { width: 1280, height: 720 },
  },

  // Test on multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: { 
        browserName: 'webkit',
      },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 },
        isMobile: true,
      },
    },
  ],

  // Local dev server (for testing)
  webServer: {
    command: 'npx http-server . -p 8080',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});