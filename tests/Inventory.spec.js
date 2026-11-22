const { test, expect } = require('@playwright/test');
require('dotenv').config();

const { Loginpage } = require('../pages/Loginpage');
const { Inventory } = require('../pages/Inventory');

const users = require('../data/users');
const constants = require('../data/constants');

let loginpage;
let inventory;

test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    inventory = new Inventory(page);

    await loginpage.open();

    await loginpage.login(
        users.standardUser.username,
        users.standardUser.password
    );
});

test('Cart badge updates when adding products', async () => {
    await inventory.addProductToCart(
        constants.texts.sauceLabBackpackText
    );

    await inventory.addProductToCart(
        constants.texts.sauceLabBikelightText
    );

    const cartCount = await inventory.getCartCount();

    expect(cartCount).toBe(2);
});

test('Products can be sorted from low to high', async () => {
    await inventory.sortBy(
        constants.sortoptions.pricelowtohigh
    );

    const prices = await inventory.getAllProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
});