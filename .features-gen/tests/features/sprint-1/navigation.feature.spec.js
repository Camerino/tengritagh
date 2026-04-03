// Generated from: tests/features/sprint-1/navigation.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Navigation', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
  });
  
  test('Desktop header shows horizontal nav links', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I view the header', null, { page }); 
    await Then('I should see horizontal nav links: Menu, About, Location, Order', null, { page }); 
  });

  test.describe('Header nav link navigates correctly', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I click the "Menu" link in the header', null, { page }); 
      await Then('I should be navigated to "/menu"', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I click the "About" link in the header', null, { page }); 
      await Then('I should be navigated to "/about"', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I click the "Location" link in the header', null, { page }); 
      await Then('I should be navigated to "/location"', null, { page }); 
    });

  });

  test('Header is sticky on scroll', async ({ Given, When, Then, page }) => { 
    await Given('a page has enough content to scroll', null, { page }); 
    await When('I scroll down the page', null, { page }); 
    await Then('the header should remain fixed at the top of the viewport', null, { page }); 
  });

  test('Hamburger menu shows on mobile', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I view the header', null, { page }); 
    await Then('a hamburger menu icon should be visible', null, { page }); 
    await And('desktop horizontal nav links should be hidden', null, { page }); 
  });

  test('Mobile nav drawer opens from the right', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I tap the hamburger menu icon', null, { page }); 
    await Then('a slide-out drawer should appear from the right', null, { page }); 
    await And('an overlay backdrop should be displayed', null, { page }); 
  });

  test('Mobile nav contains all navigation links', async ({ Given, When, Then, And, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I view the drawer contents', null, { page }); 
    await Then('I should see links for: Home, Menu, About, Location, Order', null, { page }); 
    await And('a close button should be visible', null, { page }); 
  });

  test('Mobile nav closes when a link is tapped', async ({ Given, When, Then, And, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I tap the "Menu" link', null, { page }); 
    await Then('the drawer should close', null, { page }); 
    await And('I should be navigated to "/menu"', null, { page }); 
  });

  test('Mobile nav closes when overlay is clicked', async ({ Given, When, Then, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I click the overlay backdrop', null, { page }); 
    await Then('the drawer should close', null, { page }); 
  });

  test('Mobile nav closes when close button is tapped', async ({ Given, When, Then, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I tap the close button', null, { page }); 
    await Then('the drawer should close', null, { page }); 
  });

  test('Mobile nav traps focus for accessibility', async ({ Given, When, Then, And, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I press Tab repeatedly', null, { page }); 
    await Then('focus should cycle within the drawer', null, { page }); 
    await And('focus should not move to elements behind the drawer', null, { page }); 
  });

  test('Mobile nav has dialog role', async ({ Given, When, Then, page }) => { 
    await Given('the mobile nav drawer is open', null, { page }); 
    await When('I inspect the drawer element', null, { page }); 
    await Then('it should have role "dialog" and aria-modal "true"', null, { page }); 
  });

  test('Footer includes navigation links', async ({ When, Then, page }) => { 
    await When('I view the footer', null, { page }); 
    await Then('I should see links for Home, Menu, About, and Location', null, { page }); 
  });

  test.describe('Footer nav link navigates correctly', () => {

    test('Example #1', async ({ When, Then, page }) => { 
      await When('I click the "Menu" link in the footer', null, { page }); 
      await Then('I should be navigated to "/menu"', null, { page }); 
    });

    test('Example #2', async ({ When, Then, page }) => { 
      await When('I click the "About Us" link in the footer', null, { page }); 
      await Then('I should be navigated to "/about"', null, { page }); 
    });

    test('Example #3', async ({ When, Then, page }) => { 
      await When('I click the "Location & Hours" link in the footer', null, { page }); 
      await Then('I should be navigated to "/location"', null, { page }); 
    });

  });

  test('Footer social media links open in new tab', async ({ When, Then, page }) => { 
    await When('I inspect the social media links in the footer', null, { page }); 
    await Then('each link should have target "_blank" and rel "noopener noreferrer"', null, { page }); 
  });

  test('Social media links have accessible labels', async ({ When, Then, page }) => { 
    await When('I inspect each social media link in the footer', null, { page }); 
    await Then('each should have an aria-label describing the platform', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-1/navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I view the header","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I should see horizontal nav links: Menu, About, Location, Order","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I click the \"Menu\" link in the header","stepMatchArguments":[{"group":{"start":12,"value":"\"Menu\"","children":[{"start":13,"value":"Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":24,"pickleLine":24,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":26,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I click the \"About\" link in the header","stepMatchArguments":[{"group":{"start":12,"value":"\"About\"","children":[{"start":13,"value":"About","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/about\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/about\"","children":[{"start":26,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":32,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I click the \"Location\" link in the header","stepMatchArguments":[{"group":{"start":12,"value":"\"Location\"","children":[{"start":13,"value":"Location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/location\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/location\"","children":[{"start":26,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":38,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given a page has enough content to scroll","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I scroll down the page","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then the header should remain fixed at the top of the viewport","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":46,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I view the header","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then a hamburger menu icon should be visible","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And desktop horizontal nav links should be hidden","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":53,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I tap the hamburger menu icon","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then a slide-out drawer should appear from the right","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And an overlay backdrop should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":46,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When I view the drawer contents","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then I should see links for: Home, Menu, About, Location, Order","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"And a close button should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":52,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When I tap the \"Menu\" link","stepMatchArguments":[{"group":{"start":10,"value":"\"Menu\"","children":[{"start":11,"value":"Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then the drawer should close","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":72,"pickleLine":58,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When I click the overlay backdrop","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the drawer should close","stepMatchArguments":[]}]},
  {"pwTestLine":78,"pickleLine":63,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When I tap the close button","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the drawer should close","stepMatchArguments":[]}]},
  {"pwTestLine":84,"pickleLine":68,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When I press Tab repeatedly","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then focus should cycle within the drawer","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"And focus should not move to elements behind the drawer","stepMatchArguments":[]}]},
  {"pwTestLine":91,"pickleLine":74,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"Given the mobile nav drawer is open","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"When I inspect the drawer element","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":77,"keywordType":"Outcome","textWithKeyword":"Then it should have role \"dialog\" and aria-modal \"true\"","stepMatchArguments":[{"group":{"start":20,"value":"\"dialog\"","children":[{"start":21,"value":"dialog","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":44,"value":"\"true\"","children":[{"start":45,"value":"true","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":97,"pickleLine":81,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"When I view the footer","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"Then I should see links for Home, Menu, About, and Location","stepMatchArguments":[]}]},
  {"pwTestLine":104,"pickleLine":91,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When I click the \"Menu\" link in the footer","stepMatchArguments":[{"group":{"start":12,"value":"\"Menu\"","children":[{"start":13,"value":"Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":106,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":109,"pickleLine":92,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When I click the \"About Us\" link in the footer","stepMatchArguments":[{"group":{"start":12,"value":"\"About Us\"","children":[{"start":13,"value":"About Us","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":111,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/about\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/about\"","children":[{"start":26,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":114,"pickleLine":93,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When I click the \"Location & Hours\" link in the footer","stepMatchArguments":[{"group":{"start":12,"value":"\"Location & Hours\"","children":[{"start":13,"value":"Location & Hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":116,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/location\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/location\"","children":[{"start":26,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":121,"pickleLine":95,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":122,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When I inspect the social media links in the footer","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"Then each link should have target \"_blank\" and rel \"noopener noreferrer\"","stepMatchArguments":[{"group":{"start":29,"value":"\"_blank\"","children":[{"start":30,"value":"_blank","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"noopener noreferrer\"","children":[{"start":47,"value":"noopener noreferrer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":126,"pickleLine":99,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When I inspect each social media link in the footer","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then each should have an aria-label describing the platform","stepMatchArguments":[]}]},
]; // bdd-data-end