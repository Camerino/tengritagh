// Generated from: tests/features/sprint-2/store-hours.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Store Hours', () => {

  test('Order button visible when store is open', async ({ Given, When, Then, And, page }) => { 
    await Given('the current time is during business hours', null, { page }); 
    await And('the restaurant website is loaded', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the "Order for Pickup" button should be enabled', null, { page }); 
  });

  test('Order button disabled when store is closed', async ({ Given, When, Then, And, page }) => { 
    await Given('the current time is outside business hours', null, { page }); 
    await And('the restaurant website is loaded', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the "Order for Pickup" button should be disabled or show "Opens at" with the next opening time', null, { page }); 
  });

  test('Store closed on closed day', async ({ Given, When, Then, And, page }) => { 
    await Given('today is a day the restaurant is closed', null, { page }); 
    await And('the restaurant website is loaded', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the open/closed badge should show "Closed"', null, { page }); 
  });

  test('Store open during business hours', async ({ Given, When, Then, And, page }) => { 
    await Given('today is a regular business day'); 
    await And('the current time is within operating hours', null, { page }); 
    await And('the restaurant website is loaded', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the open/closed badge should show "Open"', null, { page }); 
  });

  test('Store treated as closed 30 minutes before closing', async ({ Given, When, Then, And, page }) => { 
    await Given('the restaurant closes at 10:00 PM'); 
    await And('the current time is 9:35 PM'); 
    await And('the restaurant website is loaded', null, { page }); 
    await When('I check the store open status', null, { page }); 
    await Then('the store should be considered closed for new orders', null, { page }); 
  });

  test('Store open just before 30-minute cutoff', async ({ Given, When, Then, And, page }) => { 
    await Given('the restaurant closes at 10:00 PM'); 
    await And('the current time is 9:25 PM'); 
    await And('the restaurant website is loaded', null, { page }); 
    await When('I check the store open status', null, { page }); 
    await Then('the store should be considered open for new orders', null, { page }); 
  });

  test('Manual override forces store closed during business hours', async ({ Given, When, Then, And, page }) => { 
    await Given('siteConfig storeOpen is set to "false"', null, { page }); 
    await And('the current time is during business hours', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the store should be treated as closed', null, { page }); 
    await And('"Add to Cart" buttons should be disabled on the menu page', null, { page }); 
  });

  test('Manual override forces store open on closed day', async ({ Given, When, Then, And, page }) => { 
    await Given('siteConfig storeOpen is set to "true"', null, { page }); 
    await And('today is normally a closed day'); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the store should be treated as open', null, { page }); 
  });

  test('Cannot select pickup time outside business hours', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I am on the checkout page', null, { page }); 
    await When('I view the pickup time selector', null, { page }); 
    await Then('no time slots outside business hours should be available', null, { page }); 
  });

  test('Last available pickup slot is before closing time', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I am on the checkout page', null, { page }); 
    await When('I view the pickup time selector', null, { page }); 
    await Then('the last available slot should be at least 30 minutes before closing', null, { page }); 
  });

  test('ASAP time accounts for estimated wait', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('the estimated wait is 20 minutes'); 
    await And('I am on the checkout page', null, { page }); 
    await When('I view the ASAP option', null, { page }); 
    await Then('it should show "ASAP (~20 min)" with an estimated ready time', null, { page }); 
  });

  test('Time slots in 15-minute increments', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I am on the checkout page', null, { page }); 
    await When('I view the scheduled time slots', null, { page }); 
    await Then('the slots should be in 15-minute increments', null, { page }); 
  });

  test('Expired pickup time rejected by server', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await And('I am on the checkout page', null, { page }); 
    await And('I have been on the page for a long time', null, { page }); 
    await When('I submit an order with a pickup time that has now passed', null, { page }); 
    await Then('the server should reject the order with "This pickup time is no longer available"', null, { page }); 
  });

  test('Time slot list auto-refreshes', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the checkout page', null, { page }); 
    await When('60 seconds have passed', null, { page }); 
    await Then('the time slot list should update'); 
    await And('expired slots should be removed'); 
  });

  test('Open badge on homepage location strip', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await And('I scroll to the location strip', null, { page }); 
    await Then('the badge should show "Open" in green', null, { page }); 
  });

  test('Closed badge on homepage location strip', async ({ Given, When, Then, And, page }) => { 
    await Given('the store is currently closed', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await And('I scroll to the location strip', null, { page }); 
    await Then('the badge should show "Closed" in red', null, { page }); 
  });

  test('Open/closed badge on location page', async ({ Given, When, Then, page }) => { 
    await Given('the store is currently open', null, { page }); 
    await When('I navigate to "/location"', null, { page }); 
    await Then('the open/closed badge should show "Open"', null, { page }); 
  });

  test('All time calculations use Eastern Time', async ({ Given, When, Then, page }) => { 
    await Given('the server is in any timezone'); 
    await When('I check the store open/closed status', null, { page }); 
    await Then('the calculation should use America/New_York timezone'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-2/store-hours.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the current time is during business hours","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the \"Order for Pickup\" button should be enabled","stepMatchArguments":[{"group":{"start":4,"value":"\"Order for Pickup\"","children":[{"start":5,"value":"Order for Pickup","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":13,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the current time is outside business hours","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the \"Order for Pickup\" button should be disabled or show \"Opens at\" with the next opening time","stepMatchArguments":[{"group":{"start":4,"value":"\"Order for Pickup\"","children":[{"start":5,"value":"Order for Pickup","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":57,"value":"\"Opens at\"","children":[{"start":58,"value":"Opens at","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":20,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given today is a day the restaurant is closed","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the open/closed badge should show \"Closed\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Closed\"","children":[{"start":35,"value":"Closed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":27,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":28,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given today is a regular business day","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"And the current time is within operating hours","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"And the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the open/closed badge should show \"Open\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Open\"","children":[{"start":35,"value":"Open","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":35,"pickleLine":33,"tags":[],"steps":[{"pwStepLine":36,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Given the restaurant closes at 10:00 PM","stepMatchArguments":[{"group":{"start":25,"value":"10","children":[]},"parameterTypeName":"int"},{"group":{"start":28,"value":"00","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":37,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"And the current time is 9:35 PM","stepMatchArguments":[{"group":{"start":20,"value":"9","children":[]},"parameterTypeName":"int"},{"group":{"start":22,"value":"35","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":38,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When I check the store open status","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the store should be considered closed for new orders","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":44,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given the restaurant closes at 10:00 PM","stepMatchArguments":[{"group":{"start":25,"value":"10","children":[]},"parameterTypeName":"int"},{"group":{"start":28,"value":"00","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":45,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"And the current time is 9:25 PM","stepMatchArguments":[{"group":{"start":20,"value":"9","children":[]},"parameterTypeName":"int"},{"group":{"start":22,"value":"25","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":46,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"And the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When I check the store open status","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the store should be considered open for new orders","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":49,"tags":[],"steps":[{"pwStepLine":52,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given siteConfig storeOpen is set to \"false\"","stepMatchArguments":[{"group":{"start":31,"value":"\"false\"","children":[{"start":32,"value":"false","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And the current time is during business hours","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the store should be treated as closed","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And \"Add to Cart\" buttons should be disabled on the menu page","stepMatchArguments":[{"group":{"start":0,"value":"\"Add to Cart\"","children":[{"start":1,"value":"Add to Cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":59,"pickleLine":56,"tags":[],"steps":[{"pwStepLine":60,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Given siteConfig storeOpen is set to \"true\"","stepMatchArguments":[{"group":{"start":31,"value":"\"true\"","children":[{"start":32,"value":"true","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"And today is normally a closed day","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the store should be treated as open","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":64,"tags":[],"steps":[{"pwStepLine":67,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"And I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When I view the pickup time selector","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then no time slots outside business hours should be available","stepMatchArguments":[]}]},
  {"pwTestLine":73,"pickleLine":70,"tags":[],"steps":[{"pwStepLine":74,"gherkinStepLine":71,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":72,"keywordType":"Context","textWithKeyword":"And I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When I view the pickup time selector","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"Then the last available slot should be at least 30 minutes before closing","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":76,"tags":[],"steps":[{"pwStepLine":81,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"And the estimated wait is 20 minutes","stepMatchArguments":[{"group":{"start":22,"value":"20","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":83,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"And I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When I view the ASAP option","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then it should show \"ASAP (~20 min)\" with an estimated ready time","stepMatchArguments":[{"group":{"start":15,"value":"\"ASAP (~20 min)\"","children":[{"start":16,"value":"ASAP (~20 min)","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":88,"pickleLine":83,"tags":[],"steps":[{"pwStepLine":89,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"And I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When I view the scheduled time slots","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then the slots should be in 15-minute increments","stepMatchArguments":[]}]},
  {"pwTestLine":95,"pickleLine":89,"tags":[],"steps":[{"pwStepLine":96,"gherkinStepLine":90,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"And I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And I have been on the page for a long time","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When I submit an order with a pickup time that has now passed","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":94,"keywordType":"Outcome","textWithKeyword":"Then the server should reject the order with \"This pickup time is no longer available\"","stepMatchArguments":[{"group":{"start":40,"value":"\"This pickup time is no longer available\"","children":[{"start":41,"value":"This pickup time is no longer available","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":103,"pickleLine":96,"tags":[],"steps":[{"pwStepLine":104,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given I am on the checkout page","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"When 60 seconds have passed","stepMatchArguments":[{"group":{"start":0,"value":"60","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":106,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the time slot list should update","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"And expired slots should be removed","stepMatchArguments":[]}]},
  {"pwTestLine":110,"pickleLine":104,"tags":[],"steps":[{"pwStepLine":111,"gherkinStepLine":105,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":106,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":113,"gherkinStepLine":107,"keywordType":"Action","textWithKeyword":"And I scroll to the location strip","stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":108,"keywordType":"Outcome","textWithKeyword":"Then the badge should show \"Open\" in green","stepMatchArguments":[{"group":{"start":22,"value":"\"Open\"","children":[{"start":23,"value":"Open","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":117,"pickleLine":110,"tags":[],"steps":[{"pwStepLine":118,"gherkinStepLine":111,"keywordType":"Context","textWithKeyword":"Given the store is currently closed","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":112,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":120,"gherkinStepLine":113,"keywordType":"Action","textWithKeyword":"And I scroll to the location strip","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":114,"keywordType":"Outcome","textWithKeyword":"Then the badge should show \"Closed\" in red","stepMatchArguments":[{"group":{"start":22,"value":"\"Closed\"","children":[{"start":23,"value":"Closed","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":124,"pickleLine":116,"tags":[],"steps":[{"pwStepLine":125,"gherkinStepLine":117,"keywordType":"Context","textWithKeyword":"Given the store is currently open","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":118,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":127,"gherkinStepLine":119,"keywordType":"Outcome","textWithKeyword":"Then the open/closed badge should show \"Open\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Open\"","children":[{"start":35,"value":"Open","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":130,"pickleLine":123,"tags":[],"steps":[{"pwStepLine":131,"gherkinStepLine":124,"keywordType":"Context","textWithKeyword":"Given the server is in any timezone","stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":125,"keywordType":"Action","textWithKeyword":"When I check the store open/closed status","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":126,"keywordType":"Outcome","textWithKeyword":"Then the calculation should use America/New_York timezone","stepMatchArguments":[]}]},
]; // bdd-data-end