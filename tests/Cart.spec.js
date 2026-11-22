const { test, expect } = require('@playwright/test');
require('dotenv').config();

const { Loginpage } = require('../pages/Loginpage');
const { Inventory } = require('../pages/Inventory');
const { Cart } = require('../pages/Cart');

const users = require('../data/users');
const constants = require('../data/constants');

let loginpage;
let inventory;
let cart;

test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    inventory = new Inventory(page);
    cart = new Cart(page);

    await loginpage.open();

    await loginpage.login(
        users.standardUser.username,
        users.standardUser.password
    );
});

test('Added products appear correctly', async ({ page }) => {
    await inventory.addProductToCart(
        constants.texts.sauceLabBackpackText
    );

    await inventory.addProductToCart(
        constants.texts.sauceLabBikelightText
    );

    await cart.gotocart();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/cart.html'
    );

    const itemNames = await cart.getallcartnames();

    expect(itemNames).toEqual([
        constants.texts.sauceLabBackpackText,
        constants.texts.sauceLabBikelightText
    ]);
});

test('Product can be removed from the cart', async ({ page }) => {
    await inventory.addProductToCart(
        constants.texts.sauceLabBackpackText
    );

    await inventory.addProductToCart(
        constants.texts.sauceLabBikelightText
    );

    await cart.gotocart();

    await cart.removeproduct(
        constants.texts.sauceLabBackpackText
    );

    const count = await cart.getcartitemcount();

    expect(count).toBe(1);
});

test('Add products to cart and complete checkout', async ({ page }) => {
    await inventory.addProductToCart(
        constants.texts.sauceLabBackpackText
    );

    await inventory.addProductToCart(
        constants.texts.sauceLabBikelightText
    );

    await cart.gotocart();

    await cart.checkout();

    await cart.fillinformation(
        constants.checkout.firstname,
        constants.checkout.lastname,
        constants.checkout.postalcode
    );

    await cart.continuetooverview();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/checkout-step-two.html'
    );

    const subtotal = await cart.getsubtotal();
    const tax = await cart.gettax();
    const total = await cart.gettotal();

    expect(total).toBeCloseTo(subtotal + tax, 2);

    await cart.finish();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/checkout-complete.html'
    );
});