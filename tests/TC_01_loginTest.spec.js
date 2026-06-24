import { URLS, USERS } from '../fixture/users'; 
import {test,expect} from '../fixture/pageFixture';

test.describe('Login Page Tests' ,() =>{
test.beforeEach(async({loginPage}) =>{
        await loginPage.goto(URLS.loginUrl);
        console.log("Navigated to login page");
    })
test ("Successful login with valid credentials", async ({page,loginPage,productPage}) => {  
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(URLS.inventory);
    const title = await productPage.getTitle();
    expect(title).toBe('Products');
});
test ("Login blocked for a locked-out user",async({page,loginPage}) =>{
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await expect(page).toHaveURL(URLS.loginUrl);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
});
test ("Error shown when fields are empty", async({page,loginPage}) =>{
    await loginPage.login("", "");
    await expect(page).toHaveURL(URLS.loginUrl);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
});
})
