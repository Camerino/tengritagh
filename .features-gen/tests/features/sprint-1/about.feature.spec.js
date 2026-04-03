// Generated from: tests/features/sprint-1/about.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('About Page', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
    await And('I navigate to "/about"', null, { page }); 
  });
  
  test('About page loads successfully', async ({ Then, page }) => { 
    await Then('the page should load without errors', null, { page }); 
  });

  test('Page title is correct', async ({ When, Then, page }) => { 
    await When('I check the document title', null, { page }); 
    await Then('it should be "Our Story | Tengri Tagh Uyghur Cuisine"', null, { page }); 
  });

  test('Hero banner is displayed', async ({ When, Then, And, page }) => { 
    await When('I view the top of the about page', null, { page }); 
    await Then('I should see a hero banner with the heading "Our Story"', null, { page }); 
    await And('the banner should have a background image or gradient', null, { page }); 
  });

  test('Cuisine narrative is present', async ({ When, Then, page }) => { 
    await When('I scroll to the narrative section', null, { page }); 
    await Then('I should see at least 2 paragraphs explaining Uyghur cuisine and its Silk Road origins', null, { page }); 
  });

  test('Values section displays Authenticity', async ({ When, Then, page }) => { 
    await When('I scroll to the values section', null, { page }); 
    await Then('I should see "Authenticity" with an icon and description', null, { page }); 
  });

  test('Values section displays Community', async ({ When, Then, page }) => { 
    await When('I scroll to the values section', null, { page }); 
    await Then('I should see "Community" with an icon and description', null, { page }); 
  });

  test('Values section displays Tradition', async ({ When, Then, page }) => { 
    await When('I scroll to the values section', null, { page }); 
    await Then('I should see "Tradition" with an icon and description', null, { page }); 
  });

  test('Values in 3-column layout on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I scroll to the values section', null, { page }); 
    await Then('the values should be displayed in a 3-column row', null, { page }); 
  });

  test('Values stack vertically on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I scroll to the values section', null, { page }); 
    await Then('the values should be stacked vertically', null, { page }); 
  });

  test('Chef/owner section is displayed', async ({ When, Then, And, page }) => { 
    await When('I scroll to the chef section', null, { page }); 
    await Then('I should see a photo placeholder', null, { page }); 
    await And('I should see the chef name', null, { page }); 
    await And('I should see a brief bio', null, { page }); 
  });

  test('Decorative elements between sections', async ({ When, Then, page }) => { 
    await When('I view the page', null, { page }); 
    await Then('decorative dividers should be visible between major sections', null, { page }); 
  });

  test('Proper heading hierarchy', async ({ When, Then, page }) => { 
    await When('I inspect the heading elements', null, { page }); 
    await Then('the headings should follow a proper h1, h2, h3 hierarchy', null, { page }); 
  });

  test('All images have alt text', async ({ When, Then, page }) => { 
    await When('I inspect all images on the about page', null, { page }); 
    await Then('every image should have descriptive alt text', null, { page }); 
  });

  test.describe('About page is fully responsive', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('the about page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('the about page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('the about page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-1/about.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the page should load without errors","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I check the document title","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then it should be \"Our Story | Tengri Tagh Uyghur Cuisine\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Our Story | Tengri Tagh Uyghur Cuisine\"","children":[{"start":14,"value":"Our Story | Tengri Tagh Uyghur Cuisine","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":20,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I view the top of the about page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should see a hero banner with the heading \"Our Story\"","stepMatchArguments":[{"group":{"start":44,"value":"\"Our Story\"","children":[{"start":45,"value":"Our Story","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the banner should have a background image or gradient","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I scroll to the narrative section","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then I should see at least 2 paragraphs explaining Uyghur cuisine and its Silk Road origins","stepMatchArguments":[{"group":{"start":22,"value":"2","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":31,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Authenticity\" with an icon and description","stepMatchArguments":[{"group":{"start":13,"value":"\"Authenticity\"","children":[{"start":14,"value":"Authenticity","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Community\" with an icon and description","stepMatchArguments":[{"group":{"start":13,"value":"\"Community\"","children":[{"start":14,"value":"Community","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":41,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Tradition\" with an icon and description","stepMatchArguments":[{"group":{"start":13,"value":"\"Tradition\"","children":[{"start":14,"value":"Tradition","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":46,"pickleLine":38,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":48,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the values should be displayed in a 3-column row","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":54,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the values should be stacked vertically","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":48,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When I scroll to the chef section","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then I should see a photo placeholder","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"And I should see the chef name","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And I should see a brief bio","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":54,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When I view the page","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then decorative dividers should be visible between major sections","stepMatchArguments":[]}]},
  {"pwTestLine":70,"pickleLine":58,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":71,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When I inspect the heading elements","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the headings should follow a proper h1, h2, h3 hierarchy","stepMatchArguments":[]}]},
  {"pwTestLine":75,"pickleLine":62,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When I inspect all images on the about page","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then every image should have descriptive alt text","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":74,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":83,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":84,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the about page loads","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":75,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":90,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":91,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the about page loads","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":76,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/about\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":98,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the about page loads","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]}]},
]; // bdd-data-end