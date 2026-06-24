import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    cartPage: async({page}, use) => {
        await use(new CartPage(page));
    }

});

export { expect } from '@playwright/test';