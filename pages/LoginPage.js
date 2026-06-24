
const selectors= {
    inputFields : {
        userName : '#user-name',
        userPassword : '#password',

    },

    buttons: {
        loginBtn : '#login-button',
        errorButton : ".error-button"
    },

    textContent :{
          errorMsg : "[data-test='error']",
    }
} 

export class LoginPage{

    /*
    *@param{import('@playwright/test').Page} page
    */
   
   constructor(page) {

    this.page = page ;

   }
   // Actions

   async goto(loginurl){
        await this.page.goto(loginurl);
   }
  
   async login(username,password){
    await this.page.locator(selectors.inputFields.userName).fill(username);
    await this.page.locator(selectors.inputFields.userPassword).fill(password);
    await this.page.locator(selectors.buttons.loginBtn).click();
   }

  
   async getErrorMessage(){
    return this.page.locator(selectors.textContent.errorMsg).textContent();
   }

  
   async isErrorVisible(){
    return this.page.locator(selectors.textContent.errorMsg).isVisible();
   }
}

