// Generated from: tests/features/sprint-0/smoke.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Smoke Tests', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
  });
  
  test('Homepage loads successfully', async ({ When, Then, And, page }) => { 
    await When('I navigate to "/"', null, { page }); 
    await Then('the page should load without errors', null, { page }); 
    await And('the HTTP status should be 200', null, { page }); 
  });

  test('Development server responds', async ({ When, Then, page }) => { 
    await When('I navigate to "/"', null, { page }); 
    await Then('the page should respond within 5 seconds', null, { page }); 
  });

  test('Production build succeeds', async ({ Given, When, Then }) => { 
    await Given('the project dependencies are installed with pnpm'); 
    await When('I run "pnpm build"'); 
    await Then('the build completes with zero TypeScript or build errors'); 
  });

  test('Header is visible on every page', async ({ When, Then, And, page }) => { 
    await When('I navigate to "/"', null, { page }); 
    await Then('the header should be visible', null, { page }); 
    await And('the restaurant name "Tengri Tagh" should be displayed', null, { page }); 
  });

  test('Header logo links to homepage', async ({ When, Then, page }) => { 
    await When('I click the restaurant name "Tengri Tagh" in the header', null, { page }); 
    await Then('I should be navigated to "/"', null, { page }); 
  });

  test('Header phone number is displayed', async ({ When, Then, page }) => { 
    await When('I view the header', null, { page }); 
    await Then('a phone number link with href starting with "tel:" should be visible', null, { page }); 
  });

  test('Header cart icon is visible', async ({ When, Then, page }) => { 
    await When('I view the header', null, { page }); 
    await Then('a shopping bag icon should be visible', null, { page }); 
  });

  test('Footer is visible on every page', async ({ When, Then, page }) => { 
    await When('I navigate to "/"', null, { page }); 
    await Then('the footer should be visible', null, { page }); 
  });

  test('Footer shows social media links', async ({ When, Then, And, page }) => { 
    await When('I view the footer', null, { page }); 
    await Then('links for Instagram, Facebook, TikTok, and Yelp should be present', null, { page }); 
    await And('each link should open in a new tab', null, { page }); 
  });

  test('Footer shows restaurant hours', async ({ When, Then, page }) => { 
    await When('I view the footer', null, { page }); 
    await Then('restaurant operating hours should be displayed', null, { page }); 
  });

  test('Footer shows address and phone', async ({ When, Then, And, page }) => { 
    await When('I view the footer', null, { page }); 
    await Then('the restaurant address should be displayed', null, { page }); 
    await And('the phone number should be displayed', null, { page }); 
  });

  test('Footer has decorative border', async ({ When, Then, page }) => { 
    await When('I view the footer', null, { page }); 
    await Then('the SilkRoadPattern decorative border should be visible at the top', null, { page }); 
  });

  test('Desktop navigation links are visible', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I view the header', null, { page }); 
    await Then('horizontal nav links should be visible: Menu, About, Location, Order', null, { page }); 
    await And('the hamburger menu icon should be hidden', null, { page }); 
  });

  test('Mobile hamburger menu is visible', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I view the header', null, { page }); 
    await Then('a hamburger menu icon should be visible', null, { page }); 
    await And('the desktop horizontal nav links should be hidden', null, { page }); 
  });

  test('Mobile nav drawer opens', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I tap the hamburger menu icon', null, { page }); 
    await Then('a slide-out drawer should appear from the right', null, { page }); 
    await And('I should see links for: Home, Menu, About, Location, Order', null, { page }); 
  });

  test('Mobile nav closes on link tap', async ({ Given, When, Then, And, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I tap the "Menu" link in the drawer', null, { page }); 
    await Then('the drawer should close', null, { page }); 
    await And('I should be navigated to "/menu"', null, { page }); 
  });

  test('Page uses semantic HTML elements', async ({ When, Then, page }) => { 
    await When('I inspect the HTML structure', null, { page }); 
    await Then('the page should use header, footer, nav, and main elements', null, { page }); 
  });

  test.describe('No horizontal overflow at any viewport', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('the page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('the page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('the page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

  });

  test('Hamburger button has accessible label', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I inspect the hamburger menu button', null, { page }); 
    await Then('it should have aria-label "Open menu"', null, { page }); 
  });

  test('HTML lang attribute is set', async ({ When, Then, page }) => { 
    await When('I inspect the html element', null, { page }); 
    await Then('the lang attribute should be "en"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-0/smoke.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the page should load without errors","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the HTTP status should be 200","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the page should respond within 5 seconds","stepMatchArguments":[{"group":{"start":31,"value":"5","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":21,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the project dependencies are installed with pnpm","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When I run \"pnpm build\"","stepMatchArguments":[{"group":{"start":6,"value":"\"pnpm build\"","children":[{"start":7,"value":"pnpm build","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the build completes with zero TypeScript or build errors","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the header should be visible","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the restaurant name \"Tengri Tagh\" should be displayed","stepMatchArguments":[{"group":{"start":20,"value":"\"Tengri Tagh\"","children":[{"start":21,"value":"Tengri Tagh","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":33,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I click the restaurant name \"Tengri Tagh\" in the header","stepMatchArguments":[{"group":{"start":28,"value":"\"Tengri Tagh\"","children":[{"start":29,"value":"Tengri Tagh","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/\"","children":[{"start":26,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":38,"pickleLine":36,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When I view the header","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then a phone number link with href starting with \"tel:\" should be visible","stepMatchArguments":[{"group":{"start":44,"value":"\"tel:\"","children":[{"start":45,"value":"tel:","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":43,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When I view the header","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then a shopping bag icon should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":46,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":50,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the footer should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":50,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When I view the footer","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then links for Instagram, Facebook, TikTok, and Yelp should be present","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And each link should open in a new tab","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":55,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When I view the footer","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then restaurant operating hours should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":59,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When I view the footer","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the restaurant address should be displayed","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And the phone number should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":70,"pickleLine":64,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When I view the footer","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the SilkRoadPattern decorative border should be visible at the top","stepMatchArguments":[]}]},
  {"pwTestLine":75,"pickleLine":70,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":71,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":77,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"When I view the header","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then horizontal nav links should be visible: Menu, About, Location, Order","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"And the hamburger menu icon should be hidden","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":76,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":84,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When I view the header","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then a hamburger menu icon should be visible","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And the desktop horizontal nav links should be hidden","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":82,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":91,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When I tap the hamburger menu icon","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then a slide-out drawer should appear from the right","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"And I should see links for: Home, Menu, About, Location, Order","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":88,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":89,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"When I tap the \"Menu\" link in the drawer","stepMatchArguments":[{"group":{"start":10,"value":"\"Menu\"","children":[{"start":11,"value":"Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":99,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then the drawer should close","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"And I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":103,"pickleLine":96,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When I inspect the HTML structure","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":98,"keywordType":"Outcome","textWithKeyword":"Then the page should use header, footer, nav, and main elements","stepMatchArguments":[]}]},
  {"pwTestLine":110,"pickleLine":109,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":103,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":112,"gherkinStepLine":104,"keywordType":"Action","textWithKeyword":"When the page loads","stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":105,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":116,"pickleLine":110,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":103,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":118,"gherkinStepLine":104,"keywordType":"Action","textWithKeyword":"When the page loads","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":105,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":122,"pickleLine":111,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":103,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":124,"gherkinStepLine":104,"keywordType":"Action","textWithKeyword":"When the page loads","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":105,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":130,"pickleLine":115,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":132,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I inspect the hamburger menu button","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then it should have aria-label \"Open menu\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Open menu\"","children":[{"start":27,"value":"Open menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":136,"pickleLine":120,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":121,"keywordType":"Action","textWithKeyword":"When I inspect the html element","stepMatchArguments":[]},{"pwStepLine":138,"gherkinStepLine":122,"keywordType":"Outcome","textWithKeyword":"Then the lang attribute should be \"en\"","stepMatchArguments":[{"group":{"start":29,"value":"\"en\"","children":[{"start":30,"value":"en","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end