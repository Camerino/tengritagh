// Generated from: tests/features/sprint-3/clover-integration.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Clover POS Integration', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
    await And('the store is currently open', null, { page }); 
    await And('the mock Clover server is running', null, { page }); 
  });
  
  test('Order sent to Clover after placement', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I complete the checkout flow and place the order', null, { page }); 
    await Then('the order should be sent to Clover asynchronously', null, { page }); 
    await And('the cloverSyncStatus should be "synced" in the database', null, { page }); 
  });

  test('Clover receives correct line items', async ({ Given, When, Then, And, page }) => { 
    await Given('I have "Lamb Laghman" with quantity 2 and "Uyghur Polo" with quantity 1 in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the mock Clover should receive a bulk_line_items request', null, { page }); 
    await And('the line items should include "Lamb Laghman" with correct price and quantity 2', null, { page }); 
    await And('the line items should include "Uyghur Polo" with correct price and quantity 1', null, { page }); 
  });

  test('Clover order has correct title and note', async ({ Given, When, Then, And, page }) => { 
    await Given('I place an order as "John Doe" with phone "2125551234"', null, { page }); 
    await When('the order syncs to Clover', null, { page }); 
    await Then('the Clover order title should be "Online Pickup #" followed by the order number', null, { page }); 
    await And('the Clover order note should contain "John Doe"', null, { page }); 
    await And('the Clover order note should contain "2125551234"', null, { page }); 
    await And('the Clover order note should contain the pickup time', null, { page }); 
  });

  test('Print event triggered after order creation', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await And('the order syncs to Clover', null, { page }); 
    await Then('a print event should be triggered on the mock Clover server', null, { page }); 
  });

  test('Special instructions sent to Clover', async ({ Given, When, Then, And, page }) => { 
    await Given('I have "Lamb Laghman" with instructions "extra spicy" in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await And('the order syncs to Clover', null, { page }); 
    await Then('the Clover line item note should contain "extra spicy"', null, { page }); 
  });

  test('Kitchen note sent to Clover', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I place the order with kitchen note "Please make it mild"', null, { page }); 
    await And('the order syncs to Clover', null, { page }); 
    await Then('the Clover order note should contain "Please make it mild"', null, { page }); 
  });

  test('CloverOrderId saved to database', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await And('the order syncs to Clover', null, { page }); 
    await Then('the order record should have a cloverOrderId matching the Clover response', null, { page }); 
  });

  test('Order confirmed even if Clover is down', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server is configured to return 500 errors', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('I should see the order confirmation page immediately', null, { page }); 
    await And('the order should be saved in the local database with status "received"', null, { page }); 
  });

  test('Customer confirmation not delayed by Clover sync', async ({ Given, When, Then, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the confirmation page should load without waiting for Clover sync', null, { page }); 
  });

  test('Failed Clover sync marked as \'failed\'', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server is configured to return 500 errors', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the cloverSyncStatus should eventually be "failed" in the database', null, { page }); 
  });

  test('Partial failure saves cloverOrderId', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server fails on bulk_line_items but succeeds on order creation', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the cloverOrderId should be saved in the database', null, { page }); 
    await And('the cloverSyncStatus should be "failed"', null, { page }); 
  });

  test('Order status event created on sync', async ({ Given, When, Then, And, page }) => { 
    await Given('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await And('the order syncs to Clover successfully', null, { page }); 
    await Then('an orderStatusEvent should be created with source "clover"', null, { page }); 
  });

  test('New orders not blocked by Clover failure', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server is down', null, { page }); 
    await And('I have placed an order that failed to sync', null, { page }); 
    await When('I add new items to my cart', null, { page }); 
    await And('I place another order', null, { page }); 
    await Then('the new order should be confirmed successfully', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-3/clover-integration.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I complete the checkout flow and place the order","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the order should be sent to Clover asynchronously","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"synced\" in the database","stepMatchArguments":[{"group":{"start":31,"value":"\"synced\"","children":[{"start":32,"value":"synced","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":19,"pickleLine":19,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" with quantity 2 and \"Uyghur Polo\" with quantity 1 in my cart","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":36,"value":"2","children":[]},"parameterTypeName":"int"},{"group":{"start":42,"value":"\"Uyghur Polo\"","children":[{"start":43,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":70,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the mock Clover should receive a bulk_line_items request","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the line items should include \"Lamb Laghman\" with correct price and quantity 2","stepMatchArguments":[{"group":{"start":30,"value":"\"Lamb Laghman\"","children":[{"start":31,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":77,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":24,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the line items should include \"Uyghur Polo\" with correct price and quantity 1","stepMatchArguments":[{"group":{"start":30,"value":"\"Uyghur Polo\"","children":[{"start":31,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":76,"value":"1","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":27,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given I place an order as \"John Doe\" with phone \"2125551234\"","stepMatchArguments":[{"group":{"start":20,"value":"\"John Doe\"","children":[{"start":21,"value":"John Doe","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"2125551234\"","children":[{"start":43,"value":"2125551234","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the order syncs to Clover","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Clover order title should be \"Online Pickup #\" followed by the order number","stepMatchArguments":[{"group":{"start":33,"value":"\"Online Pickup #\"","children":[{"start":34,"value":"Online Pickup #","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the Clover order note should contain \"John Doe\"","stepMatchArguments":[{"group":{"start":37,"value":"\"John Doe\"","children":[{"start":38,"value":"John Doe","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Clover order note should contain \"2125551234\"","stepMatchArguments":[{"group":{"start":37,"value":"\"2125551234\"","children":[{"start":38,"value":"2125551234","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Clover order note should contain the pickup time","stepMatchArguments":[]}]},
  {"pwTestLine":36,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And the order syncs to Clover","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then a print event should be triggered on the mock Clover server","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given I have \"Lamb Laghman\" with instructions \"extra spicy\" in my cart","stepMatchArguments":[{"group":{"start":7,"value":"\"Lamb Laghman\"","children":[{"start":8,"value":"Lamb Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":40,"value":"\"extra spicy\"","children":[{"start":41,"value":"extra spicy","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And the order syncs to Clover","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then the Clover line item note should contain \"extra spicy\"","stepMatchArguments":[{"group":{"start":41,"value":"\"extra spicy\"","children":[{"start":42,"value":"extra spicy","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":50,"pickleLine":46,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When I place the order with kitchen note \"Please make it mild\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Please make it mild\"","children":[{"start":37,"value":"Please make it mild","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"And the order syncs to Clover","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then the Clover order note should contain \"Please make it mild\"","stepMatchArguments":[{"group":{"start":37,"value":"\"Please make it mild\"","children":[{"start":38,"value":"Please make it mild","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":57,"pickleLine":52,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"And the order syncs to Clover","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then the order record should have a cloverOrderId matching the Clover response","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":60,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"Given the mock Clover server is configured to return 500 errors","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then I should see the order confirmation page immediately","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"And the order should be saved in the local database with status \"received\"","stepMatchArguments":[{"group":{"start":60,"value":"\"received\"","children":[{"start":61,"value":"received","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":72,"pickleLine":67,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"Then the confirmation page should load without waiting for Clover sync","stepMatchArguments":[]}]},
  {"pwTestLine":78,"pickleLine":72,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given the mock Clover server is configured to return 500 errors","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then the cloverSyncStatus should eventually be \"failed\" in the database","stepMatchArguments":[{"group":{"start":42,"value":"\"failed\"","children":[{"start":43,"value":"failed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":85,"pickleLine":78,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"Given the mock Clover server fails on bulk_line_items but succeeds on order creation","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then the cloverOrderId should be saved in the database","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"failed\"","stepMatchArguments":[{"group":{"start":31,"value":"\"failed\"","children":[{"start":32,"value":"failed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":93,"pickleLine":87,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":88,"keywordType":"Context","textWithKeyword":"Given I have items in my cart","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"And the order syncs to Clover successfully","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then an orderStatusEvent should be created with source \"clover\"","stepMatchArguments":[{"group":{"start":50,"value":"\"clover\"","children":[{"start":51,"value":"clover","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":100,"pickleLine":93,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the mock Clover server is down","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And I have placed an order that failed to sync","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When I add new items to my cart","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"And I place another order","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":98,"keywordType":"Outcome","textWithKeyword":"Then the new order should be confirmed successfully","stepMatchArguments":[]}]},
]; // bdd-data-end