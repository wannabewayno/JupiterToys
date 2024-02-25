import type { Page, Locator } from '@playwright/test';

export type ProductObject = {
  name: string,
  unitPrice: number,
};

/*
  As at Feb 25 2024 the Product items looked like this.
  <li class="product ng-scope" id="product-1" ng-repeat="item in catalog">
    <div>
      <h4 class="product-title ng-binding">Teddy Bear</h4>
      <img ng-src="images/src-embed/teddy.jpg" width="200" src="images/src-embed/teddy.jpg">
      <p>
        <span class="product-price ng-binding">$12.99</span><a class="btn btn-success" ng-click="add(item)" href="">Buy</a>
      </p>
    </div>
  </li>
*/
export class Product {
  readonly product: Locator
  readonly unitPrice: Locator
  readonly addToCartButton: Locator

  constructor(public readonly page: Page, productName: string) {
    this.product = this.page.getByRole('listitem').filter({ hasText: productName });
    this.unitPrice = this.product.getByText(/\d+.\d+/);
    // This would be nicer to be defined by a button, but currently it's a link, so finding it by it's text.
    // Incase the developers ever update this to a button, it won't break the test.
    this.addToCartButton = this.product.getByText('Buy');
  }

  async addToCart(quantity: number = 1) {
    for (let index = 0; index < quantity; index++) {
      await this.addToCartButton.click();
    }
  }

  async getUnitPrice(): Promise<number> {
    const [priceStr] = await this.unitPrice.innerText().then(price => price.match(/\d+.\d+/) ?? [0]);
    return Number(priceStr);
  }

  async getProductName(): Promise<string> {
    return await this.product.getByRole('heading').innerText().then(str => str.trim().toLowerCase());
  }

  async getProductObject(): Promise<ProductObject> {
    const name = await this.getProductName();
    const unitPrice = await this.getUnitPrice();

    return {
      name,
      unitPrice,
    }
  }
}