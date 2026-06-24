const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'Standard User',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'Locked Out User',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    role: 'Problem User',
  },
};

const URLS = {
  loginUrl : '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkout: '/checkout-step-one.html',
};

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
};

module.exports = { USERS, URLS, PRODUCTS };