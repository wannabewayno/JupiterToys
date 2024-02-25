import { test, expect } from '../../src/Fixtures/AllPages';

/*
  This E2E test verifies that a user can navigate the shop page and buy some items
  What we're aiming to test is that buying items in one screen, successfully transfers the data to another screen.
  We want to make sure that basic arithmatic checks out and the user is getting that they paid for.

  - Navigate to the Shop
    - click on some items to buy

  - Go to the cart and verify that
    - The unit price from Shop matches the Unit Price shown in Cart.
    - the line item subtotals match the unit price * quantity
    - the total matches the sum of the subtotals
*/
test('Shop cart items and quantities match what the user has selected', async ({ shopPage, cartPage }) => {
  await shopPage.navigate();

  // Buy 5 x Fluffy Bunnys
  await shopPage.fluffyBunny.addToCart(5);

  // Buy 3 x Valentine Bears
  await shopPage.valentineBear.addToCart(3);

  // Buy 2 x Stuffed Frogs
  await shopPage.stuffedFrog.addToCart(2);

  // Assert that the Cart icon has the right amount of items to display.
  const cartItems = await shopPage.getNumberOfCartItems();

  /*
    We bought ten items, so there should be ten in our cart icon.
  */
  expect(cartItems).toBe(10);

  // Take note of the advertised unit price as seen from the Shop page.
  // We will use this to ensure that the unit price carries over to the cart page.
  const fluffyBunnyProduct = await shopPage.fluffyBunny.getProductObject();
  const valentineBearProduct = await shopPage.valentineBear.getProductObject();
  const stuffedFrogProduct = await shopPage.stuffedFrog.getProductObject();

  // Now let's go the cart to verifiy that all the totals and prices add up!
  await shopPage.clickOnCart();

  // Assert that we're on the cart page.
  expect(cartPage.isCurrentlyActive()).toBeTruthy();

  // Get the contents of our cart as a POJO.
  const cart = await cartPage.getCartObject();

  // There should be three items (fluffy bunny, valentine bear and stuffed frog)
  expect(cart.items).toHaveLength(3);

  // Assert that the products we bought line up to our cart summary
  const productsWeJustBought = [
    fluffyBunnyProduct,
    valentineBearProduct,
    stuffedFrogProduct,
  ]

  productsWeJustBought.forEach(product => {
    // Expect Product to exist in our cart.
    const cartItem = cart.getItemByName(product.name);
    expect(cartItem).toBeDefined();
    if (!cartItem) throw new Error(`${product.name} was not found in the cart!`)
    
    // Verify that the Advertised Price is the same as the unit price of the cart item.
    expect(cartItem?.unitPrice).toBe(product.unitPrice);
  
    // Verify the subtotal for each cartItem is the unitPrice * quantity
    expect(cartItem?.unitPrice * cartItem?.quantity).toBe(cartItem?.subtotal);
  });

  // Verify that the sum of all sub totals is the cart total
  const sumOfSubTotals = cart.sumSubTotals();
  expect(sumOfSubTotals).toBe(cart.total);
});