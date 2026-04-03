// Generated from: tests/features/sprint-2/cart.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Shopping Cart', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
    await And('the store is currently open', null, { page }); 
  });
  
  test('Add single item to cart', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the menu page', null, { page }); 
    await When('I tap "Add to Cart" on the "Lamb Laghman" menu card', null, { page }); 
    await Then('the cart should contain 1 item with quantity 1', null, { page }); 
    await And('the cart badge in the header should show "1"', null, { page }); 
  });

  test('Add multiple different items', async ({ Given, When, Then, And, page, state }) => { 
    await Given('I am on the menu page', null, { page }); 
    await When('I add "Lamb Laghman" to the cart', null, { page, state }); 
    await And('I add "Uyghur Polo" to the cart', null, { page, state }); 
    await Then('the cart should contain 2 different items', null, { page }); 
    await And('the cart badge should show "2"', null, { page }); 
  });

  test('Increase item quantity in cart', async ({ Given, When, Then, And, page }) => { 
    await Given('I have "Lamb Laghman" in my cart with quantity 1', null, { page }); 
    await And('I am on the cart page', null, { page }); 
    await When('I tap the plus button on "Lamb Laghman"', null, { page }); 
    await Then('the quantity should increase to 2', null, { page }); 
    await And('the subtotal should update accordingly', null, { page }); 
  });

  test('Decrease item quantity in cart', async ({ Given, When, Then, And, page }) => { 
    await Given('I have "Lamb Laghman" in my cart with quantity 3', null, { page }); 
    await And('I am on the cart page', null, { page }); 
    await When('I tap the minus button on "Lamb Laghman"', null, { page }); 
    await Then('the quantity should decrease to 2', null, { page }); 
    await And('the subtotal should update accordingly', null, { page }); 
  });

  test('Remove item from cart', async ({ Given, When, Then, And, page }) => { 
    await Given('I have "Lamb Laghman" and "Uyghur Polo" in my cart', null, { page }); 
    await And('I am on the cart page', null, { page }); 
    await When('I tap the remove button on "Lamb Laghman"', null, { page }); 
    await Then('"Lamb Laghman" should no longer be in the cart', null, { page }); 
    await And('the subtotal should update accordingly', null, { page }); 
  });

  test('Cart shows correct subtotal', async ({ Given, Then, And, page }) => { 
    await Given('I have "Lamb Laghman" at $15.95 with quantity 2 in my cart', null, { page }); 
    await And('I have "Uyghur Polo" at $14.95 with quantity 1 in my cart', null, { page }); 
    await And('I am on the cart page', null, { page }); 
    await Then('the subtotal should be "$46.85"', null, { page }); 
  });

  test('Cart persists after page refresh', async ({ Given, When, Then, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I refresh the page', null, { page }); 
    await Then('the cart should still contain the same items with the same quantities', null, { page }); 
  });

  test('Cart persists after browser close and reopen', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I close the browser and reopen it', null, { page }); 
    await And('I navigate to the cart page', null, { page }); 
    await Then('the cart should still contain the same items', null, { page }); 
  });

  test('Empty cart shows empty state message', async ({ Given, When, Then, And, page }) => { 
    await Given('the cart is empty', null, { page }); 
    await When('I navigate to "/cart"', null, { page }); 
    await Then('I should see "Your cart is empty" message', null, { page }); 
    await And('I should see a "Browse Menu" button linking to "/menu"', null, { page }); 
  });

  test('Cannot proceed to checkout with empty cart', async ({ Given, When, Then, page }) => { 
    await Given('the cart is empty', null, { page }); 
    await When('I navigate to "/checkout"', null, { page }); 
    await Then('I should be redirected to "/cart" or see an appropriate message', null, { page }); 
  });

  test('Add item with special instructions', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the menu page', null, { page }); 
    await When('I open the detail modal for "Lamb Laghman"', null, { page }); 
    await And('I type "no onions" in the special instructions', null, { page }); 
    await And('I tap "Add to Cart" in the modal', null, { page }); 
    await Then('the cart should contain "Lamb Laghman" with instructions "no onions"', null, { page }); 
    await And('the instructions should be visible on the cart page', null, { page }); 
  });

  test('Add 20+ items to cart (large order)', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the menu page', null, { page }); 
    await When('I add 20 different items to the cart', null, { page }); 
    await And('I navigate to the cart page', null, { page }); 
    await Then('all 20 items should be displayed', null, { page }); 
    await And('the subtotal should be calculated correctly', null, { page }); 
  });

  test('Cart shows item Chinese names', async ({ Given, When, Then, page, state }) => { 
    await Given('I have "Lamb Laghman" in my cart', null, { page, state }); 
    await When('I navigate to the cart page', null, { page }); 
    await Then('I should see both the English name and Chinese name for each item', null, { page }); 
  });

  test('Cart page displays item thumbnails', async ({ Given, When, Then, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I navigate to "/cart"', null, { page }); 
    await Then('each cart item should display a thumbnail image', null, { page }); 
  });

  test('Cart page shows special instructions', async ({ Given, When, Then, page }) => { 
    await Given('I have an item with special instructions in my cart', null, { page }); 
    await When('I navigate to "/cart"', null, { page }); 
    await Then('the special instructions should be displayed below the item name', null, { page }); 
  });

  test('Cart shows estimated tax', async ({ Given, When, Then, page }) => { 
    await Given('I have items totaling $46.85 in my cart', null, { page }); 
    await When('I navigate to "/cart"', null, { page }); 
    await Then('I should see an estimated tax line of approximately 8.875%', null, { page }); 
  });

  test('Cart shows estimated total', async ({ Given, When, Then, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I navigate to "/cart"', null, { page }); 
    await Then('I should see an estimated total equal to subtotal plus tax', null, { page }); 
  });

  test('Proceed to Checkout button navigates correctly', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await And('I am on the cart page', null, { page }); 
    await When('I tap "Proceed to Checkout"', null, { page }); 
    await Then('I should be navigated to "/checkout"', null, { page }); 
  });

  test('Continue Shopping link navigates to menu', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await And('I am on the cart page', null, { page }); 
    await When('I tap "Continue Shopping"', null, { page }); 
    await Then('I should be navigated to "/menu"', null, { page }); 
  });

  test('Cart page title is correct', async ({ When, Then, page }) => { 
    await When('I navigate to "/cart"', null, { page }); 
    await Then('the page title should be "Cart | Tengri Tagh Uyghur Cuisine"', null, { page }); 
  });

  test('Sticky cart bar hidden when cart is empty', async ({ Given, When, Then, And, page }) => { 
    await Given('the cart is empty', null, { page }); 
    await And('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/menu"', null, { page }); 
    await Then('the sticky cart bar should not be visible', null, { page }); 
  });

  test('Sticky cart bar appears on adding first item', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await And('I am on the menu page', null, { page }); 
    await When('I add an item to the cart', null, { page }); 
    await Then('the sticky cart bar should appear at the bottom of the viewport', null, { page }); 
  });

  test('Sticky cart bar shows item count and subtotal', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await And('I have 3 items totaling $47.85 in my cart', null, { page }); 
    await When('I view the menu page', null, { page }); 
    await Then('the sticky cart bar should show "3 items" and "$47.85"', null, { page }); 
  });

  test('Sticky cart bar hidden on desktop', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I view the menu page', null, { page }); 
    await Then('the sticky cart bar should not be visible', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-2/cart.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the menu page","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I tap \"Add to Cart\" on the \"Lamb Laghman\" menu card","stepMatchArguments":[{"group":{"start":6,"value":"\"Add to Cart\"","children":[{"start":7,"value":"Add to Cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":27,"value":"\"Lamb Laghman\"","children":[{"start":28,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the cart should contain 1 item with quantity 1","stepMatchArguments":[{"group":{"start":24,"value":"1","children":[]},"parameterTypeName":"int"},{"group":{"start":45,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And the cart badge in the header should show \"1\"","stepMatchArguments":[{"group":{"start":41,"value":"\"1\"","children":[{"start":42,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given I am on the menu page","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I add \"Lamb Laghman\" to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Lamb Laghman\"","children":[{"start":7,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I add \"Uyghur Polo\" to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Uyghur Polo\"","children":[{"start":7,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the cart should contain 2 different items","stepMatchArguments":[{"group":{"start":24,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the cart badge should show \"2\"","stepMatchArguments":[{"group":{"start":27,"value":"\"2\"","children":[{"start":28,"value":"2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":26,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" in my cart with quantity 1","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And I am on the cart page","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I tap the plus button on \"Lamb Laghman\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Lamb Laghman\"","children":[{"start":26,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the quantity should increase to 2","stepMatchArguments":[{"group":{"start":32,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the subtotal should update accordingly","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" in my cart with quantity 3","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":36,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"And I am on the cart page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When I tap the minus button on \"Lamb Laghman\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Lamb Laghman\"","children":[{"start":27,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the quantity should decrease to 2","stepMatchArguments":[{"group":{"start":32,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":39,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the subtotal should update accordingly","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" and \"Uyghur Polo\" in my cart","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":26,"value":"\"Uyghur Polo\"","children":[{"start":27,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And I am on the cart page","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I tap the remove button on \"Lamb Laghman\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Lamb Laghman\"","children":[{"start":28,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then \"Lamb Laghman\" should no longer be in the cart","stepMatchArguments":[{"group":{"start":0,"value":"\"Lamb Laghman\"","children":[{"start":1,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the subtotal should update accordingly","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":46,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" at $15.95 with quantity 2 in my cart","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":26,"value":"15.95","children":[]},"parameterTypeName":"float"},{"group":{"start":46,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":52,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"And I have \"Uyghur Polo\" at $14.95 with quantity 1 in my cart","stepMatchArguments":[{"group":{"start":7,"value":"\"Uyghur Polo\"","children":[{"start":8,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":25,"value":"14.95","children":[]},"parameterTypeName":"float"},{"group":{"start":45,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":53,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"And I am on the cart page","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then the subtotal should be \"$46.85\"","stepMatchArguments":[{"group":{"start":23,"value":"\"$46.85\"","children":[{"start":24,"value":"$46.85","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":57,"pickleLine":52,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When I refresh the page","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then the cart should still contain the same items with the same quantities","stepMatchArguments":[]}]},
  {"pwTestLine":63,"pickleLine":57,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When I close the browser and reopen it","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"And I navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the cart should still contain the same items","stepMatchArguments":[]}]},
  {"pwTestLine":70,"pickleLine":63,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the cart is empty","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":73,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Your cart is empty\" message","stepMatchArguments":[{"group":{"start":13,"value":"\"Your cart is empty\"","children":[{"start":14,"value":"Your cart is empty","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"And I should see a \"Browse Menu\" button linking to \"/menu\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Browse Menu\"","children":[{"start":16,"value":"Browse Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"\"/menu\"","children":[{"start":48,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":77,"pickleLine":69,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"Given the cart is empty","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"When I navigate to \"/checkout\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/checkout\"","children":[{"start":15,"value":"/checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":80,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to \"/cart\" or see an appropriate message","stepMatchArguments":[{"group":{"start":26,"value":"\"/cart\"","children":[{"start":27,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":83,"pickleLine":74,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"Given I am on the menu page","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"When I open the detail modal for \"Lamb Laghman\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Lamb Laghman\"","children":[{"start":29,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"And I type \"no onions\" in the special instructions","stepMatchArguments":[{"group":{"start":7,"value":"\"no onions\"","children":[{"start":8,"value":"no onions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":87,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"And I tap \"Add to Cart\" in the modal","stepMatchArguments":[{"group":{"start":6,"value":"\"Add to Cart\"","children":[{"start":7,"value":"Add to Cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":88,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the cart should contain \"Lamb Laghman\" with instructions \"no onions\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Lamb Laghman\"","children":[{"start":25,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":57,"value":"\"no onions\"","children":[{"start":58,"value":"no onions","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And the instructions should be visible on the cart page","stepMatchArguments":[]}]},
  {"pwTestLine":92,"pickleLine":82,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given I am on the menu page","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When I add 20 different items to the cart","stepMatchArguments":[{"group":{"start":6,"value":"20","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":95,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"And I navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then all 20 items should be displayed","stepMatchArguments":[{"group":{"start":4,"value":"20","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":97,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"And the subtotal should be calculated correctly","stepMatchArguments":[]}]},
  {"pwTestLine":100,"pickleLine":89,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":90,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" in my cart","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":102,"gherkinStepLine":91,"keywordType":"Action","textWithKeyword":"When I navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"Then I should see both the English name and Chinese name for each item","stepMatchArguments":[]}]},
  {"pwTestLine":106,"pickleLine":96,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"When I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":109,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then each cart item should display a thumbnail image","stepMatchArguments":[]}]},
  {"pwTestLine":112,"pickleLine":101,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":102,"keywordType":"Context","textWithKeyword":"Given I have an item with special instructions in my cart","stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":103,"keywordType":"Action","textWithKeyword":"When I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":115,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"Then the special instructions should be displayed below the item name","stepMatchArguments":[]}]},
  {"pwTestLine":118,"pickleLine":106,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":107,"keywordType":"Context","textWithKeyword":"Given I have items totaling $46.85 in my cart","stepMatchArguments":[{"group":{"start":23,"value":"46.85","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":120,"gherkinStepLine":108,"keywordType":"Action","textWithKeyword":"When I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":121,"gherkinStepLine":109,"keywordType":"Outcome","textWithKeyword":"Then I should see an estimated tax line of approximately 8.875%","stepMatchArguments":[]}]},
  {"pwTestLine":124,"pickleLine":111,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":112,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":113,"keywordType":"Action","textWithKeyword":"When I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":127,"gherkinStepLine":114,"keywordType":"Outcome","textWithKeyword":"Then I should see an estimated total equal to subtotal plus tax","stepMatchArguments":[]}]},
  {"pwTestLine":130,"pickleLine":116,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":117,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":118,"keywordType":"Context","textWithKeyword":"And I am on the cart page","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":119,"keywordType":"Action","textWithKeyword":"When I tap \"Proceed to Checkout\"","stepMatchArguments":[{"group":{"start":6,"value":"\"Proceed to Checkout\"","children":[{"start":7,"value":"Proceed to Checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":134,"gherkinStepLine":120,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/checkout\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/checkout\"","children":[{"start":26,"value":"/checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":137,"pickleLine":122,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":138,"gherkinStepLine":123,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":124,"keywordType":"Context","textWithKeyword":"And I am on the cart page","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":125,"keywordType":"Action","textWithKeyword":"When I tap \"Continue Shopping\"","stepMatchArguments":[{"group":{"start":6,"value":"\"Continue Shopping\"","children":[{"start":7,"value":"Continue Shopping","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":141,"gherkinStepLine":126,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":144,"pickleLine":128,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":145,"gherkinStepLine":129,"keywordType":"Action","textWithKeyword":"When I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":146,"gherkinStepLine":130,"keywordType":"Outcome","textWithKeyword":"Then the page title should be \"Cart | Tengri Tagh Uyghur Cuisine\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Cart | Tengri Tagh Uyghur Cuisine\"","children":[{"start":26,"value":"Cart | Tengri Tagh Uyghur Cuisine","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":149,"pickleLine":134,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":150,"gherkinStepLine":135,"keywordType":"Context","textWithKeyword":"Given the cart is empty","stepMatchArguments":[]},{"pwStepLine":151,"gherkinStepLine":136,"keywordType":"Context","textWithKeyword":"And I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":152,"gherkinStepLine":137,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":153,"gherkinStepLine":138,"keywordType":"Outcome","textWithKeyword":"Then the sticky cart bar should not be visible","stepMatchArguments":[]}]},
  {"pwTestLine":156,"pickleLine":140,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":157,"gherkinStepLine":141,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":158,"gherkinStepLine":142,"keywordType":"Context","textWithKeyword":"And I am on the menu page","stepMatchArguments":[]},{"pwStepLine":159,"gherkinStepLine":143,"keywordType":"Action","textWithKeyword":"When I add an item to the cart","stepMatchArguments":[]},{"pwStepLine":160,"gherkinStepLine":144,"keywordType":"Outcome","textWithKeyword":"Then the sticky cart bar should appear at the bottom of the viewport","stepMatchArguments":[]}]},
  {"pwTestLine":163,"pickleLine":146,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":147,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":165,"gherkinStepLine":148,"keywordType":"Context","textWithKeyword":"And I have 3 items totaling $47.85 in my cart","stepMatchArguments":[{"group":{"start":7,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":25,"value":"47.85","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":166,"gherkinStepLine":149,"keywordType":"Action","textWithKeyword":"When I view the menu page","stepMatchArguments":[]},{"pwStepLine":167,"gherkinStepLine":150,"keywordType":"Outcome","textWithKeyword":"Then the sticky cart bar should show \"3 items\" and \"$47.85\"","stepMatchArguments":[{"group":{"start":32,"value":"\"3 items\"","children":[{"start":33,"value":"3 items","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"$47.85\"","children":[{"start":47,"value":"$47.85","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":170,"pickleLine":152,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":153,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":172,"gherkinStepLine":154,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":155,"keywordType":"Action","textWithKeyword":"When I view the menu page","stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":156,"keywordType":"Outcome","textWithKeyword":"Then the sticky cart bar should not be visible","stepMatchArguments":[]}]},
]; // bdd-data-end