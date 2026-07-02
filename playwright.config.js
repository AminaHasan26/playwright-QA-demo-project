// playwright.config.js

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [["allure-playwright"],["html"]],

  use: {
    baseURL : 'https://www.saucedemo.com/',
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace : 'on'
    
  }
});