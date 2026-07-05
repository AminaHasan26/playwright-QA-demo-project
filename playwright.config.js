// playwright.config.js

const { defineConfig, devices } = require('@playwright/test');
const { baseURL } = require('./config/environments');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [["allure-playwright"],["html"]],
  retries: process.env.CI ? 2 : 0,

  use: {
    //baseURL ,
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace : 'on-first-retry'
  }
});