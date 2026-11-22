const { test, expect } = require('@playwright/test');
const {Loginpage} = require('../pages/Loginpage')
const users = require('../data/users')
const constants = require('../data/constants')
let loginpage //define loginpage

test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    await loginpage.open();

})

test('User can login with valid credentials @smoke', async ({ page }) => {

    await loginpage.login(users.standardUser.username, users.standardUser.password)

     

   await expect(page).toHaveURL(
    process.env.BASE_URL + constants.urls.inventoryurl);

    await expect(page.locator('.title')).toHaveText(constants.texts.producttitle);

});
