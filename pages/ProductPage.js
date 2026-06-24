const selectors = {
    header: {
        pageTitle: '.title',
        cartIcon: '.shopping_cart_container',
        cartBadge: '[data-test="shopping-cart-badge"]'
    },

    products: {
        productList: '.inventory_list',
        productItem: '.inventory_item',
        productNames: '.inventory_item_name'
    },

    filters: {
        sortDropdown: '.product_sort_container'
    },

    actions: {
        menuButton: '#react-burger-menu-btn',
        logOutBtn: '[data-test="logout-sidebar-link"]'
    }
}

class ProductPage{
     /*
    *@param{import('@playwright/test').Page} page
    */

    constructor (page){
        this.page = page ;

    }

    //Actions
    async getTitle(){

       return this.page.locator(selectors.header.pageTitle).textContent();
    }

    // this is getting into productName block and then clicking the add button to add item in the cart
    async addItemByName(productName){
      const item = this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    }); // dynamic locator to select item form the list with the product name
    await item.locator('button').click();
    }

    async getCartCount(){
        const visible = await this.page.locator(selectors.header.cartBadge).isVisible();  
        if(!visible) return 0
        const textNum = await this.page.locator(selectors.header.cartBadge).textContent();
        return parseInt(textNum,10);
         }

    async goTocart(){
        await this.page.locator(selectors.header.cartIcon).click();
    }

    async sortBy(value){
        await this.page.locator(selectors.filters.sortDropdown).selectOption(value);
    }

    async getProductNames (){
        return this.page.locator(selectors.products.productNames).allTextContents();

    }

    async logout(){
        await this.page.locator(selectors.actions.menuButton).click();
        await this.page.locator(selectors.actions.logOutBtn).visible();
        await this.page.locator(selectors.actions.logOutBtn).click();
    }
}

module.exports = {ProductPage};