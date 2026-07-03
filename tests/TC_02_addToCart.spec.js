import { URLS, USERS , PRODUCTS } from '../fixture/users'; 
import {test,expect} from '../fixture/pageFixture';
test.describe("@regression Add To Cart Test", async()=>{
test.beforeEach("loginAsStandardUser", async({page,loginPage}) =>{
    await loginPage.goto(URLS.loginUrl);
    console.log("Navigated to login page");
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(URLS.inventory);  
});
test ("cart badge should show 1 after adding one product", async({page,loginPage,productPage})=>{
    const initialCount = await productPage.getCartCount();
    expect(initialCount).toBe(0);
    await productPage.addItemByName(PRODUCTS.backpack);
    const updatedCount = await productPage.getCartCount();
    expect(updatedCount).toBe(1);
});
test ("cart page should contain the added product", async({page,loginPage,productPage,cartPage})=>{
    
    await productPage.addItemByName(PRODUCTS.bikeLight);
    await productPage.goTocart();
    await expect(cartPage.validateHasProductName(PRODUCTS.bikeLight)).toBeTruthy();
});
test("cart count should be correct after adding multiple products", async ({page,loginPage,productPage,cartPage})=>{
    await productPage.addItemByName(PRODUCTS.bikeLight);
    await productPage.addItemByName(PRODUCTS.boltShirt);
    expect(await cartPage.getCartCount()).toBe(2);
    await productPage.goTocart();
    expect(await cartPage.getItemCount()).toBe(2);
});
test("cart badge should update after removing an item",async ({ productPage, cartPage }) => {
    await productPage.addItemByName(PRODUCTS.bikeLight);
    await productPage.addItemByName(PRODUCTS.boltShirt);
    expect(await cartPage.getCartCount()).toBe(2);
    await productPage.goTocart();
    await cartPage.removeItems(PRODUCTS.bikeLight);
    expect(await cartPage.getCartCount()).toBe(1);
    expect(await cartPage.getItemCount()).toBe(1);
    expect(
        await cartPage.validateHasProductName(PRODUCTS.bikeLight)
    ).toBeFalsy();
    expect(
        await cartPage.validateHasProductName(PRODUCTS.boltShirt)
    ).toBeTruthy();
});
})