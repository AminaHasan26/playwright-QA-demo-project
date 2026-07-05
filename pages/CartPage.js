const selectors = {
    labels: {
        pageTitle: '.title'
    },
    cart: {
        cartList: '#cart-list',
        cartItems: '.cart_item',
        itemNames: '.inventory_item_name',
        cartBadge:  '.shopping_cart_badge'
    },
    buttons: {
        checkoutButton: '[data-test="checkout"]',
        continueShopBtn: '[data-test="continue-shopping"]'
    }
}

class CartPage{
    constructor(page) {
        this.page = page 
    }
    
    async getTitle(){
        return this.page.locator(selectors.labels.pageTitle).textContent();
    }

    async getItemCount(){
        return this.page.locator(selectors.cart.cartItems).count();
}

    async getItemNames(){
        return this.page.locator(selectors.cart.itemNames).allTextContents();
    }

    async validateHasProductName(productName){
        const names = await this.getItemNames();
        return names.includes(productName);
    }

    async removeItems(itemtoremove){
        const item = this.page.locator('.cart_item',{has:this.page.locator('.inventory_item_name',{hasText:itemtoremove})});
        await item.locator('button').click();
    }

    async getCartCount(){
        const visible = await this.page.locator(selectors.cart.cartBadge).isVisible();  
        if(!visible) return 0
        const textNum = await this.page.locator(selectors.cart.cartBadge).textContent();
        return parseInt(textNum,10);
    }

    async clickToCheckout() {
    await this.page.locator(selectors.buttons.checkoutButton).click();
  }

    }

module.exports = {CartPage};
