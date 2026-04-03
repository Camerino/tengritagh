// Generated from: tests/features/sprint-3/clover-failure.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Clover Failure Handling', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
    await And('the store is currently open', null, { page }); 
    await And('the mock Clover server is running', null, { page }); 
  });
  
  test('Retry on 500 error succeeds', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 500 for the first 2 requests then succeeds', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the Clover sync should succeed on the 3rd attempt', null, { page }); 
    await And('the cloverSyncStatus should be "synced"', null, { page }); 
  });

  test('All retries exhausted marks order as failed', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 500 for all requests', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the sync should be attempted 4 times (initial + 3 retries)', null, { page }); 
    await And('the cloverSyncStatus should be "failed"', null, { page }); 
  });

  test('No retry on 400 client error', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 400', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the sync should fail immediately without retries', null, { page }); 
    await And('the cloverSyncStatus should be "failed"', null, { page }); 
  });

  test('Retry on timeout', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server has a 15-second delay on the first request', null, { page }); 
    await And('the client timeout is 10 seconds'); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the sync should retry after the timeout', null, { page }); 
    await And('eventually succeed if the next attempt responds normally', null, { page }); 
  });

  test('Retry on 429 rate limit', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 429 on the first request then succeeds', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the sync should retry', null, { page }); 
    await And('the cloverSyncStatus should be "synced"', null, { page }); 
  });

  test('Customer gets confirmation regardless of Clover failure', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server is completely down', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('I should see the order confirmation page', null, { page }); 
    await And('the order should be saved locally with status "received"', null, { page }); 
  });

  test('New orders not blocked by Clover failure', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server is down', null, { page }); 
    await And('a previous order failed to sync'); 
    await When('I add items and place a new order', null, { page }); 
    await Then('the new order should be confirmed successfully', null, { page }); 
  });

  test('Order created on Clover but line items fail', async ({ Given, When, Then, And, But, page }) => { 
    await Given('the mock Clover server succeeds for order creation'); 
    await But('fails for bulk_line_items', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the cloverOrderId should be saved', null, { page }); 
    await And('the cloverSyncStatus should be "failed"', null, { page }); 
  });

  test('Each retry attempt is logged', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 500 for 2 requests then succeeds', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('each retry attempt should be logged with the attempt number and error'); 
  });

  test('Failed sync is logged with order details', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 500 for all requests', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('an error log should include the order ID, order number, error message, and retry count'); 
  });

  test('Retries use exponential backoff', async ({ Given, When, Then, And, page }) => { 
    await Given('the mock Clover server returns 500 for all requests', null, { page }); 
    await And('I have items in my cart', null, { page }); 
    await When('I place the order', null, { page }); 
    await Then('the retry delays should be approximately 1s, 2s, and 4s'); 
  });

  test('Health endpoint reports failed sync count', async ({ Given, When, Then, page }) => { 
    await Given('there are orders with cloverSyncStatus "failed" in the last 24 hours'); 
    await When('I query the health check endpoint', null, { page }); 
    await Then('the response should include a failedCloverSyncs count greater than 0', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-3/clover-failure.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 500 for the first 2 requests then succeeds","stepMatchArguments":[{"group":{"start":49,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the Clover sync should succeed on the 3rd attempt","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"synced\"","stepMatchArguments":[{"group":{"start":31,"value":"\"synced\"","children":[{"start":32,"value":"synced","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":20,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 500 for all requests","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the sync should be attempted 4 times (initial + 3 retries)","stepMatchArguments":[{"group":{"start":29,"value":"4","children":[]},"parameterTypeName":"int"},{"group":{"start":48,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":25,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"failed\"","stepMatchArguments":[{"group":{"start":31,"value":"\"failed\"","children":[{"start":32,"value":"failed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":28,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 400","stepMatchArguments":[{"group":{"start":31,"value":"400","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the sync should fail immediately without retries","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"failed\"","stepMatchArguments":[{"group":{"start":31,"value":"\"failed\"","children":[{"start":32,"value":"failed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given the mock Clover server has a 15-second delay on the first request","stepMatchArguments":[{"group":{"start":29,"value":"15","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":38,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And the client timeout is 10 seconds","stepMatchArguments":[{"group":{"start":22,"value":"10","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":39,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then the sync should retry after the timeout","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And eventually succeed if the next attempt responds normally","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 429 on the first request then succeeds","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the sync should retry","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"synced\"","stepMatchArguments":[{"group":{"start":31,"value":"\"synced\"","children":[{"start":32,"value":"synced","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":53,"pickleLine":51,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given the mock Clover server is completely down","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then I should see the order confirmation page","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And the order should be saved locally with status \"received\"","stepMatchArguments":[{"group":{"start":46,"value":"\"received\"","children":[{"start":47,"value":"received","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":61,"pickleLine":58,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given the mock Clover server is down","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And a previous order failed to sync","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When I add items and place a new order","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then the new order should be confirmed successfully","stepMatchArguments":[]}]},
  {"pwTestLine":68,"pickleLine":66,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given the mock Clover server succeeds for order creation","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"But fails for bulk_line_items","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then the cloverOrderId should be saved","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"And the cloverSyncStatus should be \"failed\"","stepMatchArguments":[{"group":{"start":31,"value":"\"failed\"","children":[{"start":32,"value":"failed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":77,"pickleLine":76,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 500 for 2 requests then succeeds","stepMatchArguments":[{"group":{"start":31,"value":"500","children":[]},"parameterTypeName":"int"},{"group":{"start":39,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":79,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then each retry attempt should be logged with the attempt number and error","stepMatchArguments":[]}]},
  {"pwTestLine":84,"pickleLine":82,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 500 for all requests","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then an error log should include the order ID, order number, error message, and retry count","stepMatchArguments":[]}]},
  {"pwTestLine":91,"pickleLine":90,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"Given the mock Clover server returns 500 for all requests","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And I have items in my cart","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When I place the order","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":94,"keywordType":"Outcome","textWithKeyword":"Then the retry delays should be approximately 1s, 2s, and 4s","stepMatchArguments":[]}]},
  {"pwTestLine":98,"pickleLine":98,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the store is currently open","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And the mock Clover server is running","isBg":true,"stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":99,"keywordType":"Context","textWithKeyword":"Given there are orders with cloverSyncStatus \"failed\" in the last 24 hours","stepMatchArguments":[{"group":{"start":39,"value":"\"failed\"","children":[{"start":40,"value":"failed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":100,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When I query the health check endpoint","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then the response should include a failedCloverSyncs count greater than 0","stepMatchArguments":[{"group":{"start":67,"value":"0","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end