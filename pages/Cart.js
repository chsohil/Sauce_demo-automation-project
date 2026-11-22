class Cart {
    constructor(page) {
        this.page = page;

        // Cart page
        this.cartlink = page.locator('.shopping_cart_link');
        this.itemNames = page.locator('.cart_item .inventory_item_name');
        this.cartitem = page.locator('.cart_item');

        // Checkout form
        this.checkoutbutton = page.locator('#checkout');
        this.firstname = page.locator('[data-test="firstName"]');
        this.lastname = page.locator('[data-test="lastName"]');
        this.postcode = page.locator('[data-test="postalCode"]');

        // Checkout overview
        this.continuebutton = page.locator('[data-test="continue"]');
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.totalprice = page.locator('.summary_total_label');

        // Finish
        this.finishbutton = page.locator('[data-test="finish"]');
    }

    async gotocart() {
        await this.cartlink.click();
    }

    async getallcartnames() {
        return await this.itemNames.allTextContents();
    }

    getcartitem(productname) {
        return this.cartitem.filter({ hasText: productname });
    }

    async removeproduct(productname) {
        const item = this.getcartitem(productname);
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    async getcartitemcount() {
        return await this.cartitem.count();
    }

    async checkout() {
        await this.checkoutbutton.click();
    }

    async fillinformation(firstname, lastname, postalcode) {
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.postcode.fill(postalcode);
    }

    async continuetooverview() {
        await this.continuebutton.click();
    }

    async getsubtotal() {
        const text = await this.subtotal.textContent();
        return parseFloat(text.replace('Item total: $', ''));
    }

    async gettax() {
        const text = await this.tax.textContent();
        return parseFloat(text.replace('Tax: $', ''));
    }

    async gettotal() {
        const text = await this.totalprice.textContent();
        return parseFloat(text.replace('Total: $', ''));
    }

    async finish() {
        await this.finishbutton.click();
    }
}

module.exports = { Cart };