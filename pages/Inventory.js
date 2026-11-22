class Inventory {
    constructor(page) {
        this.page = page;

        this.inventoryItemLocator = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    }

    getProductCard(productName) {
        return this.inventoryItemLocator.filter({ hasText: productName });
    }

    async addProductToCart(productName) {
        const product = this.getProductCard(productName);

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartCount() {
        const hasBadge = await this.cartBadge.count();

        if (hasBadge === 0) {
            return 0;
        }

        return parseInt(await this.cartBadge.textContent(), 10);
    }

    async sortBy(optionValue) {
        await this.sortDropdown.selectOption(optionValue);
    }

    async getAllProductPrices() {
        const priceTexts = await this.itemPrices.allTextContents();

        return priceTexts.map(price =>
            parseFloat(price.replace('$', ''))
        );
    }
}

module.exports = { Inventory };