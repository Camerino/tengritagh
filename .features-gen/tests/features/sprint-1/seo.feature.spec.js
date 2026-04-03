// Generated from: tests/features/sprint-1/seo.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('SEO and Metadata', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
  });
  
  test.describe('Each page has a unique title', () => {

    test('Example #1', async ({ When, Then, page }) => { 
      await When('I navigate to "/"', null, { page }); 
      await Then('the page title should contain "Tengri Tagh Uyghur Cuisine"', null, { page }); 
    });

    test('Example #2', async ({ When, Then, page }) => { 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('the page title should contain "Menu"', null, { page }); 
    });

    test('Example #3', async ({ When, Then, page }) => { 
      await When('I navigate to "/about"', null, { page }); 
      await Then('the page title should contain "Our Story"', null, { page }); 
    });

    test('Example #4', async ({ When, Then, page }) => { 
      await When('I navigate to "/location"', null, { page }); 
      await Then('the page title should contain "Location"', null, { page }); 
    });

  });

  test.describe('Each page has a meta description', () => {

    test('Example #1', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/"', null, { page }); 
      await Then('the meta description should exist', null, { page }); 
      await And('the meta description should be between 120 and 160 characters', null, { page }); 
    });

    test('Example #2', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('the meta description should exist', null, { page }); 
      await And('the meta description should be between 120 and 160 characters', null, { page }); 
    });

    test('Example #3', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/about"', null, { page }); 
      await Then('the meta description should exist', null, { page }); 
      await And('the meta description should be between 120 and 160 characters', null, { page }); 
    });

    test('Example #4', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/location"', null, { page }); 
      await Then('the meta description should exist', null, { page }); 
      await And('the meta description should be between 120 and 160 characters', null, { page }); 
    });

  });

  test.describe('OpenGraph tags are set on every page', () => {

    test('Example #1', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/"', null, { page }); 
      await Then('the page should have an "og:title" meta tag', null, { page }); 
      await And('the page should have an "og:description" meta tag', null, { page }); 
      await And('the page should have an "og:image" meta tag', null, { page }); 
      await And('the page should have an "og:url" meta tag', null, { page }); 
      await And('the page should have an "og:type" meta tag', null, { page }); 
    });

    test('Example #2', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('the page should have an "og:title" meta tag', null, { page }); 
      await And('the page should have an "og:description" meta tag', null, { page }); 
      await And('the page should have an "og:image" meta tag', null, { page }); 
      await And('the page should have an "og:url" meta tag', null, { page }); 
      await And('the page should have an "og:type" meta tag', null, { page }); 
    });

    test('Example #3', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/about"', null, { page }); 
      await Then('the page should have an "og:title" meta tag', null, { page }); 
      await And('the page should have an "og:description" meta tag', null, { page }); 
      await And('the page should have an "og:image" meta tag', null, { page }); 
      await And('the page should have an "og:url" meta tag', null, { page }); 
      await And('the page should have an "og:type" meta tag', null, { page }); 
    });

    test('Example #4', async ({ When, Then, And, page }) => { 
      await When('I navigate to "/location"', null, { page }); 
      await Then('the page should have an "og:title" meta tag', null, { page }); 
      await And('the page should have an "og:description" meta tag', null, { page }); 
      await And('the page should have an "og:image" meta tag', null, { page }); 
      await And('the page should have an "og:url" meta tag', null, { page }); 
      await And('the page should have an "og:type" meta tag', null, { page }); 
    });

  });

  test('Default OG image is accessible', async ({ When, Then, page }) => { 
    await When('I check the og:image URL on the homepage', null, { page }); 
    await Then('the image should be accessible and approximately 1200x630 pixels', null, { page }); 
  });

  test('Twitter Card tags are set on homepage', async ({ When, Then, And, page }) => { 
    await When('I navigate to "/"', null, { page }); 
    await Then('the page should have twitter:card set to "summary_large_image"', null, { page }); 
    await And('the page should have a twitter:title meta tag', null, { page }); 
    await And('the page should have a twitter:description meta tag', null, { page }); 
    await And('the page should have a twitter:image meta tag', null, { page }); 
  });

  test('Homepage has Restaurant structured data', async ({ When, Then, And, page }) => { 
    await When('I inspect the JSON-LD script on the homepage', null, { page }); 
    await Then('it should contain "@type" set to "Restaurant"', null, { page }); 
    await And('it should contain the restaurant name', null, { page }); 
    await And('it should contain an address', null, { page }); 
    await And('it should contain a telephone number', null, { page }); 
    await And('it should contain servesCuisine including "Uyghur"', null, { page }); 
    await And('it should contain openingHoursSpecification', null, { page }); 
    await And('it should contain a menu URL', null, { page }); 
  });

  test('Menu page has structured data with items', async ({ When, Then, page }) => { 
    await When('I inspect the JSON-LD script on "/menu"', null, { page }); 
    await Then('it should contain menu item names and prices', null, { page }); 
  });

  test('robots.txt allows all crawlers', async ({ When, Then, And, page }) => { 
    await When('I navigate to "/robots.txt"', null, { page }); 
    await Then('the file should exist', null, { page }); 
    await And('it should allow all crawlers', null, { page }); 
  });

  test('sitemap.xml lists all public pages', async ({ When, Then, And, page }) => { 
    await When('I navigate to "/sitemap.xml"', null, { page }); 
    await Then('it should list "/"', null, { page }); 
    await And('it should list "/menu"', null, { page }); 
    await And('it should list "/about"', null, { page }); 
    await And('it should list "/location"', null, { page }); 
  });

  test('HTML lang attribute is set to English', async ({ When, Then, page }) => { 
    await When('I inspect the html element', null, { page }); 
    await Then('the lang attribute should be "en"', null, { page }); 
  });

  test.describe('Canonical URLs are set on each page', () => {

    test('Example #1', async ({ When, Then, page }) => { 
      await When('I navigate to "/"', null, { page }); 
      await Then('a canonical link element should be present matching the page URL', null, { page }); 
    });

    test('Example #2', async ({ When, Then, page }) => { 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('a canonical link element should be present matching the page URL', null, { page }); 
    });

    test('Example #3', async ({ When, Then, page }) => { 
      await When('I navigate to "/about"', null, { page }); 
      await Then('a canonical link element should be present matching the page URL', null, { page }); 
    });

    test('Example #4', async ({ When, Then, page }) => { 
      await When('I navigate to "/location"', null, { page }); 
      await Then('a canonical link element should be present matching the page URL', null, { page }); 
    });

  });

  test('Chinese dish names in menu page metadata', async ({ When, Then, page }) => { 
    await When('I inspect the meta description on "/menu"', null, { page }); 
    await Then('it should include Chinese characters for discoverability', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-1/seo.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the page title should contain \"Tengri Tagh Uyghur Cuisine\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Tengri Tagh Uyghur Cuisine\"","children":[{"start":31,"value":"Tengri Tagh Uyghur Cuisine","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the page title should contain \"Menu\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Menu\"","children":[{"start":31,"value":"Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the page title should contain \"Our Story\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Our Story\"","children":[{"start":31,"value":"Our Story","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":27,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the page title should contain \"Location\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Location\"","children":[{"start":31,"value":"Location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the meta description should exist","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the meta description should be between 120 and 160 characters","stepMatchArguments":[{"group":{"start":39,"value":"120","children":[]},"parameterTypeName":"int"},{"group":{"start":47,"value":"160","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":42,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the meta description should exist","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the meta description should be between 120 and 160 characters","stepMatchArguments":[{"group":{"start":39,"value":"120","children":[]},"parameterTypeName":"int"},{"group":{"start":47,"value":"160","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":48,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":50,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the meta description should exist","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the meta description should be between 120 and 160 characters","stepMatchArguments":[{"group":{"start":39,"value":"120","children":[]},"parameterTypeName":"int"},{"group":{"start":47,"value":"160","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":54,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the meta description should exist","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the meta description should be between 120 and 160 characters","stepMatchArguments":[{"group":{"start":39,"value":"120","children":[]},"parameterTypeName":"int"},{"group":{"start":47,"value":"160","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":64,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the page should have an \"og:title\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:title\"","children":[{"start":25,"value":"og:title","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":67,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:description\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:description\"","children":[{"start":25,"value":"og:description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":68,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:image\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:image\"","children":[{"start":25,"value":"og:image","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":69,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:url\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:url\"","children":[{"start":25,"value":"og:url","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:type\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:type\"","children":[{"start":25,"value":"og:type","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":73,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the page should have an \"og:title\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:title\"","children":[{"start":25,"value":"og:title","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:description\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:description\"","children":[{"start":25,"value":"og:description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:image\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:image\"","children":[{"start":25,"value":"og:image","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":78,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:url\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:url\"","children":[{"start":25,"value":"og:url","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":79,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:type\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:type\"","children":[{"start":25,"value":"og:type","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":82,"pickleLine":44,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the page should have an \"og:title\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:title\"","children":[{"start":25,"value":"og:title","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":85,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:description\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:description\"","children":[{"start":25,"value":"og:description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:image\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:image\"","children":[{"start":25,"value":"og:image","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":87,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:url\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:url\"","children":[{"start":25,"value":"og:url","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":88,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:type\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:type\"","children":[{"start":25,"value":"og:type","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":91,"pickleLine":45,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":93,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the page should have an \"og:title\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:title\"","children":[{"start":25,"value":"og:title","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":94,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:description\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:description\"","children":[{"start":25,"value":"og:description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":95,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:image\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:image\"","children":[{"start":25,"value":"og:image","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":96,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:url\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:url\"","children":[{"start":25,"value":"og:url","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the page should have an \"og:type\" meta tag","stepMatchArguments":[{"group":{"start":24,"value":"\"og:type\"","children":[{"start":25,"value":"og:type","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":102,"pickleLine":47,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When I check the og:image URL on the homepage","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then the image should be accessible and approximately 1200x630 pixels","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":51,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":109,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the page should have twitter:card set to \"summary_large_image\"","stepMatchArguments":[{"group":{"start":41,"value":"\"summary_large_image\"","children":[{"start":42,"value":"summary_large_image","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the page should have a twitter:title meta tag","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And the page should have a twitter:description meta tag","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And the page should have a twitter:image meta tag","stepMatchArguments":[]}]},
  {"pwTestLine":115,"pickleLine":58,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When I inspect the JSON-LD script on the homepage","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then it should contain \"@type\" set to \"Restaurant\"","stepMatchArguments":[{"group":{"start":18,"value":"\"@type\"","children":[{"start":19,"value":"@type","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":33,"value":"\"Restaurant\"","children":[{"start":34,"value":"Restaurant","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":118,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And it should contain the restaurant name","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And it should contain an address","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And it should contain a telephone number","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"And it should contain servesCuisine including \"Uyghur\"","stepMatchArguments":[{"group":{"start":42,"value":"\"Uyghur\"","children":[{"start":43,"value":"Uyghur","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":122,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"And it should contain openingHoursSpecification","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"And it should contain a menu URL","stepMatchArguments":[]}]},
  {"pwTestLine":126,"pickleLine":68,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"When I inspect the JSON-LD script on \"/menu\"","stepMatchArguments":[{"group":{"start":32,"value":"\"/menu\"","children":[{"start":33,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":128,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"Then it should contain menu item names and prices","stepMatchArguments":[]}]},
  {"pwTestLine":131,"pickleLine":72,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When I navigate to \"/robots.txt\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/robots.txt\"","children":[{"start":15,"value":"/robots.txt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":133,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"Then the file should exist","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"And it should allow all crawlers","stepMatchArguments":[]}]},
  {"pwTestLine":137,"pickleLine":77,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":138,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When I navigate to \"/sitemap.xml\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/sitemap.xml\"","children":[{"start":15,"value":"/sitemap.xml","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":139,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then it should list \"/\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/\"","children":[{"start":16,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":140,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And it should list \"/menu\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/menu\"","children":[{"start":16,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":141,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"And it should list \"/about\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/about\"","children":[{"start":16,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":142,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And it should list \"/location\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/location\"","children":[{"start":16,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":145,"pickleLine":84,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":146,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When I inspect the html element","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then the lang attribute should be \"en\"","stepMatchArguments":[{"group":{"start":29,"value":"\"en\"","children":[{"start":30,"value":"en","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":152,"pickleLine":94,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":153,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":154,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then a canonical link element should be present matching the page URL","stepMatchArguments":[]}]},
  {"pwTestLine":157,"pickleLine":95,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":158,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":159,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then a canonical link element should be present matching the page URL","stepMatchArguments":[]}]},
  {"pwTestLine":162,"pickleLine":96,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":164,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then a canonical link element should be present matching the page URL","stepMatchArguments":[]}]},
  {"pwTestLine":167,"pickleLine":97,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":168,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":169,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then a canonical link element should be present matching the page URL","stepMatchArguments":[]}]},
  {"pwTestLine":174,"pickleLine":99,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":175,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When I inspect the meta description on \"/menu\"","stepMatchArguments":[{"group":{"start":34,"value":"\"/menu\"","children":[{"start":35,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":176,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then it should include Chinese characters for discoverability","stepMatchArguments":[]}]},
]; // bdd-data-end