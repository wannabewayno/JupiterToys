import type { Locator } from '@playwright/test';
import { CartItem } from './CartItem';
import type { CartItemJSON } from './CartItem';

export class CartObject {
  constructor(public readonly items: CartItemJSON[], public readonly total: number) {}

  /*
    Handy method to get a cart item by product name
  */
  getItemByName(name: string): CartItemJSON | undefined {
    return this.items.find(item => item.name === name);
  }

  sumSubTotals(): number {
    return this.items.reduce((sum, cartItemJSON) => sum + cartItemJSON.subtotal ?? 0, 0);
  }
}


/*
  Assumes that our cart is a table element and it's locator will be passed into the constructor.
*/
export class Cart {
  constructor(public readonly cart: Locator) {}

  async getCartItems(): Promise<CartItemJSON[]>{
    const items = await this.cart.locator('tbody').getByRole('row').all();
    const cartItemsJSON = await Promise.all(items.map(item => new CartItem(item).toJSON()));

    return cartItemsJSON;
  }

  /*
    Locates the Total in the table footer and converts it to a number.
  */
  async getCartTotal(): Promise<number> {
    const totalStr = await this.cart.locator('tfoot').getByText('Total').innerText();
    if (!totalStr) return 0;
    const [totalNum] = totalStr.match(/\d+.\d+/) ?? [0];
    return Number(totalNum);
  }

  /*
    Process the cart elements into JSON for easier testing.
  */
  async toObject(): Promise<CartObject> {
    const cartItemsJSON = await this.getCartItems();
    const total =  await this.getCartTotal();

    return new CartObject(cartItemsJSON, total);
  }
}