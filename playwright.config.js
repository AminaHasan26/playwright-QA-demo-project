// playwright.config.js

const { defineConfig, devices } = require('@playwright/test');
const { baseURL } = require('./config/environments');

module.exports = defineConfig({
  testDir: './tests',

  reporter: [["allure-playwright"],["html"]],

  use: {
    baseURL ,
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace : 'on'
    
  }
});