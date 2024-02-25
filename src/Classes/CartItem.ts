import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../Classes/BasePage';
import { Navbar } from '../Components/Navbar';

export type CartItemJSON = {
  name: string
  unitPrice: number
  quantity: number
  subtotal: number
}

/*
  Current Cart items are ordered like this
  Item Name | Unit Price | Quantity (input box) | Subtotal | Actions (remove button)
*/
export class CartItem {
  private readonly itemName: Locator;
  private readonly unitPrice: Locator;
  private readonly quantity: Locator;
  private readonly subTotal: Locator;
  private readonly removeItemButton: Locator;

  constructor(public readonly item: Locator) {
    this.itemName = item.locator('td').nth(0);
    this.unitPrice = item.locator('td').nth(1);
    this.quantity = item.locator('td').nth(2).locator('input');
    this.subTotal = item.locator('td').nth(3);

    // This would be nicer to be defined by a button, but currently it's a link, so finding by it's text.
    this.removeItemButton = item.locator('td').nth(4).getByTitle('remove item');
  }

  /*
    Convert a CartItem to JSON.
  */
  async toJSON(): Promise<CartItemJSON> {
    const name = await this.itemName.innerText().then(name => name.toLowerCase().trim());
    const [unitPrice] = await this.unitPrice.innerText().then(price => price.match(/\d+\.\d+/) ?? []);
    const quantity = await this.quantity.inputValue().then(qty => Number(qty));
    const [subTotal] = await this.subTotal.innerText().then(price => price.match(/\d+\.\d+/) ?? []);

    if (!unitPrice) throw new Error(`Could not find Unit price for ${name}`);
    if (!subTotal) throw new Error(`Could not find SubTotal for ${name}`);

    return { name, unitPrice: Number(unitPrice), quantity: quantity, subtotal: Number(subTotal) };
  }

  async removeFromCart() {
    await this.removeItemButton.click();
  }

  async addQuantity(quantity: number = 1) {
    // TODO:
  }

  async removeQuantity(quantity: number = 1) {
    // TODO:
  }
}