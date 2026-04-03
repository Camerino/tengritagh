// Generated from: tests/features/sprint-2/ordering-edge-cases.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Ordering Edge Cases', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
  });
  
  test('Add to Cart disabled when store is closed', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently closed', null, { page }); 
    await When('I navigate to "/menu"', null, { page }); 
    await Then('all "Add to Cart" buttons should be disabled', null, { page }); 
    await And('I should see a message indicating the store is closed', null, { page }); 
  });

  test('Homepage CTA disabled when store is closed', async ({ Given, When, Then, page }) => { 
    await Given('the store is currently closed', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the "Order for Pickup" button should be disabled or show the next opening time', null, { page }); 
  });

  test('Checkout blocked when store is closed', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently closed', null, { page }); 
    await And('I have items in my cart from a previous session', null, { page }); 
    await When('I navigate to "/checkout"', null, { page }); 
    await Then('I should see a message "We\'re currently closed"', null, { page }); 
    await And('I should not be able to submit the order', null, { page }); 
  });

  test('Double-click Place Order only creates one order', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await And('I am on the checkout page with valid information filled in', null, { page }); 
    await When('I rapidly click "Place Order" twice', null, { page }); 
    await Then('only one order should be created in the database'); 
    await And('I should see one confirmation page', null, { page }); 
  });

  test('Place Order button disabled during submission', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await And('I am on the checkout page with valid information filled in', null, { page }); 
    await When('I tap "Place Order"', null, { page }); 
    await Then('the button should immediately show a loading state', null, { page }); 
    await And('the button should be disabled', null, { page }); 
  });

  test('Submit with missing required fields', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await And('I navigate to "/checkout"', null, { page }); 
    await When('I tap "Place Order" without filling in any fields', null, { page }); 
    await Then('I should see validation errors for name and phone fields', null, { page }); 
    await And('the order should not be submitted', null, { page }); 
  });

  test('Invalid phone number format', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the checkout page', null, { page }); 
    await When('I enter "abc" as the phone number', null, { page }); 
    await And('I blur the phone field', null, { page }); 
    await Then('I should see a phone validation error', null, { page }); 
  });

  test('Invalid email format', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the checkout page', null, { page }); 
    await When('I enter "not@valid" as the email', null, { page }); 
    await And('I blur the email field', null, { page }); 
    await Then('I should see an email validation error', null, { page }); 
  });

  test('Large order with 20 different items', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I am on the menu page', null, { page }); 
    await When('I add 20 different items to the cart', null, { page }); 
    await And('I proceed through checkout with valid information', null, { page }); 
    await And('I place the order', null, { page }); 
    await Then('all 20 items should appear on the confirmation page', null, { page }); 
    await And('the totals should be calculated correctly', null, { page }); 
  });

  test('Single item with quantity 50', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I am on the menu page', null, { page }); 
    await When('I open the detail modal for "Lamb Laghman"', null, { page }); 
    await And('I set the quantity to 50', null, { page }); 
    await And('I add it to the cart', null, { page }); 
    await And('I navigate to the cart page', null, { page }); 
    await Then('the quantity should show 50', null, { page }); 
    await And('the line total should be correct for 50 units', null, { page }); 
  });

  test('Last available pickup slot is before closing time', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('it is approaching closing time'); 
    await When('I navigate to "/checkout"', null, { page }); 
    await And('I view the pickup time selector', null, { page }); 
    await Then('the last available time slot should be at least 30 minutes before closing', null, { page }); 
  });

  test('ASAP time accounts for estimated wait', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await When('I navigate to "/checkout"', null, { page }); 
    await And('I view the ASAP option', null, { page }); 
    await Then('the estimated ready time should be current time plus the estimated wait minutes', null, { page }); 
  });

  test('Cart survives page navigation', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I navigate to "/about"', null, { page }); 
    await And('I navigate to "/menu"', null, { page }); 
    await And('I navigate to "/cart"', null, { page }); 
    await Then('the cart should still contain my items', null, { page }); 
  });

  test('Cart survives page refresh', async ({ Given, When, Then, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I refresh the page', null, { page }); 
    await Then('the cart should still contain the same items', null, { page }); 
  });

  test('Order with invalid order ID shows not found', async ({ When, Then, page }) => { 
    await When('I navigate to "/order/invalid-id-12345"', null, { page }); 
    await Then('I should see an "Order not found" message', null, { page }); 
  });

  test('Unavailable item cannot be added', async ({ Given, When, Then, And, page }) => { 
    await Given('a menu item is marked as unavailable'); 
    await When('I view that item on the menu page', null, { page }); 
    await Then('the "Add to Cart" button should be disabled', null, { page }); 
    await And('it should show "Unavailable"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-2/ordering-edge-cases.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given the store is currently closed","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then all \"Add to Cart\" buttons should be disabled","stepMatchArguments":[{"group":{"start":4,"value":"\"Add to Cart\"","children":[{"start":5,"value":"Add to Cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And I should see a message indicating the store is closed","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given the store is currently closed","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the \"Order for Pickup\" button should be disabled or show the next opening time","stepMatchArguments":[{"group":{"start":4,"value":"\"Order for Pickup\"","children":[{"start":5,"value":"Order for Pickup","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":23,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the store is currently closed","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And I have items in my cart from a previous session","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I navigate to \"/checkout\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/checkout\"","children":[{"start":15,"value":"/checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then I should see a message \"We're currently closed\"","stepMatchArguments":[{"group":{"start":23,"value":"\"We're currently closed\"","children":[{"start":24,"value":"We're currently closed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And I should not be able to submit the order","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"And I am on the checkout page with valid information filled in","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When I rapidly click \"Place Order\" twice","stepMatchArguments":[{"group":{"start":16,"value":"\"Place Order\"","children":[{"start":17,"value":"Place Order","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then only one order should be created in the database","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And I should see one confirmation page","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"And I am on the checkout page with valid information filled in","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When I tap \"Place Order\"","stepMatchArguments":[{"group":{"start":6,"value":"\"Place Order\"","children":[{"start":7,"value":"Place Order","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then the button should immediately show a loading state","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":49,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"And I navigate to \"/checkout\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/checkout\"","children":[{"start":15,"value":"/checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I tap \"Place Order\" without filling in any fields","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see validation errors for name and phone fields","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And the order should not be submitted","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":57,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When I enter \"abc\" as the phone number","stepMatchArguments":[{"group":{"start":8,"value":"\"abc\"","children":[{"start":9,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"And I blur the phone field","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then I should see a phone validation error","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":63,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When I enter \"not@valid\" as the email","stepMatchArguments":[{"group":{"start":8,"value":"\"not@valid\"","children":[{"start":9,"value":"not@valid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And I blur the email field","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then I should see an email validation error","stepMatchArguments":[]}]},
  {"pwTestLine":72,"pickleLine":71,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":72,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"And I am on the menu page","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When I add 20 different items to the cart","stepMatchArguments":[{"group":{"start":6,"value":"20","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":76,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"And I proceed through checkout with valid information","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"And I place the order","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":77,"keywordType":"Outcome","textWithKeyword":"Then all 20 items should appear on the confirmation page","stepMatchArguments":[{"group":{"start":4,"value":"20","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":79,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"And the totals should be calculated correctly","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":80,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":81,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"And I am on the menu page","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"When I open the detail modal for \"Lamb Laghman\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Lamb Laghman\"","children":[{"start":29,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And I set the quantity to 50","stepMatchArguments":[{"group":{"start":22,"value":"50","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":87,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"And I add it to the cart","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"And I navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then the quantity should show 50","stepMatchArguments":[{"group":{"start":25,"value":"50","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":90,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"And the line total should be correct for 50 units","stepMatchArguments":[{"group":{"start":37,"value":"50","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":93,"pickleLine":92,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":93,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"And it is approaching closing time","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":95,"keywordType":"Action","textWithKeyword":"When I navigate to \"/checkout\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/checkout\"","children":[{"start":15,"value":"/checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"And I view the pickup time selector","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"Then the last available time slot should be at least 30 minutes before closing","stepMatchArguments":[]}]},
  {"pwTestLine":101,"pickleLine":99,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":100,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":101,"keywordType":"Action","textWithKeyword":"When I navigate to \"/checkout\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/checkout\"","children":[{"start":15,"value":"/checkout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"And I view the ASAP option","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the estimated ready time should be current time plus the estimated wait minutes","stepMatchArguments":[]}]},
  {"pwTestLine":108,"pickleLine":107,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":110,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":112,"gherkinStepLine":111,"keywordType":"Action","textWithKeyword":"And I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":113,"gherkinStepLine":112,"keywordType":"Action","textWithKeyword":"And I navigate to \"/cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/cart\"","children":[{"start":15,"value":"/cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":114,"gherkinStepLine":113,"keywordType":"Outcome","textWithKeyword":"Then the cart should still contain my items","stepMatchArguments":[]}]},
  {"pwTestLine":117,"pickleLine":115,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I refresh the page","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then the cart should still contain the same items","stepMatchArguments":[]}]},
  {"pwTestLine":123,"pickleLine":122,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"When I navigate to \"/order/invalid-id-12345\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/order/invalid-id-12345\"","children":[{"start":15,"value":"/order/invalid-id-12345","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":125,"gherkinStepLine":124,"keywordType":"Outcome","textWithKeyword":"Then I should see an \"Order not found\" message","stepMatchArguments":[{"group":{"start":16,"value":"\"Order not found\"","children":[{"start":17,"value":"Order not found","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":128,"pickleLine":126,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":127,"keywordType":"Context","textWithKeyword":"Given a menu item is marked as unavailable","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":128,"keywordType":"Action","textWithKeyword":"When I view that item on the menu page","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":129,"keywordType":"Outcome","textWithKeyword":"Then the \"Add to Cart\" button should be disabled","stepMatchArguments":[{"group":{"start":4,"value":"\"Add to Cart\"","children":[{"start":5,"value":"Add to Cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":132,"gherkinStepLine":130,"keywordType":"Outcome","textWithKeyword":"And it should show \"Unavailable\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Unavailable\"","children":[{"start":16,"value":"Unavailable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end