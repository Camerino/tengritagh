// Generated from: tests/features/sprint-1/homepage.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Homepage', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
  });
  
  test('Etles pattern stripe is visible in hero', async ({ When, Then, page }) => { 
    await When('I view the hero section', null, { page }); 
    await Then('I should see a horizontal etles pattern stripe', null, { page }); 
  });

  test('Chef GIF is displayed in circular frame', async ({ When, Then, page }) => { 
    await When('I view the hero section', null, { page }); 
    await Then('I should see an animated GIF of a chef hand-pulling noodles in a circular frame', null, { page }); 
  });

  test('Uyghur script is displayed as decoration', async ({ When, Then, page }) => { 
    await When('I view the hero section', null, { page }); 
    await Then('I should see the Uyghur script text as a decorative element', null, { page }); 
  });

  test('Restaurant name in Playfair Display font', async ({ When, Then, page }) => { 
    await When('I view the hero section', null, { page }); 
    await Then('I should see "Tengri Tagh Uyghur Cuisine" in Playfair Display font', null, { page }); 
  });

  test('Times Square link opens Google Maps', async ({ When, Then, page }) => { 
    await When('I click "Near Times Square, NYC" in the hero section', null, { page }); 
    await Then('Google Maps should open in a new tab', null, { page }); 
  });

  test('Order for Pickup CTA links to menu', async ({ When, Then, page }) => { 
    await When('I click the "Order for Pickup" button in the hero', null, { page }); 
    await Then('I should be navigated to "/menu"', null, { page }); 
  });

  test('View Menu CTA links to menu', async ({ When, Then, page }) => { 
    await When('I click the "View Menu" button in the hero', null, { page }); 
    await Then('I should be navigated to "/menu"', null, { page }); 
  });

  test('Food photos displayed below CTAs', async ({ When, Then, page }) => { 
    await When('I view the hero section', null, { page }); 
    await Then('I should see food photos of laghman and kawap', null, { page }); 
  });

  test('Hero stacks vertically on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I view the hero section', null, { page }); 
    await Then('the hero layout should be stacked vertically', null, { page }); 
  });

  test('Hero is side-by-side on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I view the hero section', null, { page }); 
    await Then('the hero layout should be side-by-side', null, { page }); 
  });

  test('Featured dishes are displayed from database', async ({ When, Then, page }) => { 
    await When('I scroll to the featured dishes section', null, { page }); 
    await Then('I should see between 3 and 6 featured menu items', null, { page }); 
  });

  test('Featured dish cards show bilingual names and price', async ({ When, Then, And, page }) => { 
    await When('I scroll to the featured dishes section', null, { page }); 
    await Then('each featured dish card should show an image', null, { page }); 
    await And('each card should show the English name', null, { page }); 
    await And('each card should show the Chinese name', null, { page }); 
    await And('each card should show the price', null, { page }); 
  });

  test.describe('Featured dish shows correct Chinese name', () => {

    test('Example #1', async ({ When, Then, page }) => { 
      await When('I view the featured dish "Big Plate Chicken Laghman"', null, { page }); 
      await Then('I should see the Chinese name "大盘鸡拌面"', null, { page }); 
    });

    test('Example #2', async ({ When, Then, page }) => { 
      await When('I view the featured dish "Uyghur Polo"', null, { page }); 
      await Then('I should see the Chinese name "手抓饭"', null, { page }); 
    });

    test('Example #3', async ({ When, Then, page }) => { 
      await When('I view the featured dish "Lamb Samsa"', null, { page }); 
      await Then('I should see the Chinese name "烤包子"', null, { page }); 
    });

  });

  test('Featured dishes scroll horizontally on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I scroll to the featured dishes section', null, { page }); 
    await Then('the featured dishes should be horizontally scrollable', null, { page }); 
  });

  test('Featured dishes in 3-column grid on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I scroll to the featured dishes section', null, { page }); 
    await Then('the featured dishes should be displayed in a 3-column grid', null, { page }); 
  });

  test('Freshly Made heading is displayed', async ({ When, Then, page }) => { 
    await When('I scroll to the freshly made section', null, { page }); 
    await Then('I should see the heading "Freshly Made for Every Order"', null, { page }); 
  });

  test('Freshly Made GIF circles are visible', async ({ When, Then, page }) => { 
    await When('I scroll to the freshly made section', null, { page }); 
    await Then('I should see animated GIF circles in circular frames with consistent sizing', null, { page }); 
  });

  test('Google reviews are displayed', async ({ When, Then, And, page }) => { 
    await When('I scroll to the reviews section', null, { page }); 
    await Then('I should see 3 to 4 Google reviews', null, { page }); 
    await And('each review should show a star rating, reviewer name, review text, and date', null, { page }); 
  });

  test('Reviews carousel on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I scroll to the reviews section', null, { page }); 
    await Then('the reviews should be displayed in a carousel format', null, { page }); 
  });

  test('Reviews grid on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I scroll to the reviews section', null, { page }); 
    await Then('the reviews should be displayed in a grid layout', null, { page }); 
  });

  test('Reviews graceful degradation', async ({ Given, When, Then, page }) => { 
    await Given('the Google Places API is unavailable', null, { page }); 
    await When('the homepage loads', null, { page }); 
    await Then('the reviews section should be hidden or show a fallback', null, { page }); 
  });

  test('Third-party platform links are displayed', async ({ When, Then, page }) => { 
    await When('I scroll to the order platforms section', null, { page }); 
    await Then('I should see branded links for "DoorDash", "Uber Eats", and "Grubhub"', null, { page }); 
  });

  test('Platform links open in new tab', async ({ When, Then, page }) => { 
    await When('I click the "DoorDash" platform link', null, { page }); 
    await Then('it should open in a new tab with the correct URL', null, { page }); 
  });

  test('About teaser paragraph is displayed', async ({ When, Then, page }) => { 
    await When('I scroll to the about teaser section', null, { page }); 
    await Then('I should see a brief paragraph about Uyghur cuisine', null, { page }); 
  });

  test('Learn More link navigates to about page', async ({ When, Then, page }) => { 
    await When('I click the "Learn More" link in the about teaser', null, { page }); 
    await Then('I should be navigated to "/about"', null, { page }); 
  });

  test('Location strip shows essential info', async ({ When, Then, And, page }) => { 
    await When('I scroll to the location strip', null, { page }); 
    await Then('I should see a map thumbnail', null, { page }); 
    await And('I should see the restaurant address', null, { page }); 
    await And('I should see a phone number', null, { page }); 
    await And('I should see restaurant hours', null, { page }); 
    await And('I should see an open/closed badge', null, { page }); 
  });

  test('Location strip address opens Google Maps', async ({ When, Then, page }) => { 
    await When('I click the address in the location strip', null, { page }); 
    await Then('Google Maps should open in a new tab', null, { page }); 
  });

  test('Location strip phone is a tel link', async ({ When, Then, page }) => { 
    await When('I inspect the phone number in the location strip', null, { page }); 
    await Then('the phone link href should start with "tel:"', null, { page }); 
  });

  test('Open/closed badge reflects store status', async ({ When, Then, page }) => { 
    await When('I view the location strip', null, { page }); 
    await Then('the open/closed badge should reflect the current status from siteConfig', null, { page }); 
  });

  test('All images have alt text', async ({ When, Then, page }) => { 
    await When('I inspect all images on the homepage', null, { page }); 
    await Then('every image should have a non-empty alt attribute', null, { page }); 
  });

  test.describe('Homepage is fully responsive', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('the homepage loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('the homepage loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('the homepage loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-1/homepage.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should see a horizontal etles pattern stripe","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see an animated GIF of a chef hand-pulling noodles in a circular frame","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":19,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the Uyghur script text as a decorative element","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I should see \"Tengri Tagh Uyghur Cuisine\" in Playfair Display font","stepMatchArguments":[{"group":{"start":13,"value":"\"Tengri Tagh Uyghur Cuisine\"","children":[{"start":14,"value":"Tengri Tagh Uyghur Cuisine","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I click \"Near Times Square, NYC\" in the hero section","stepMatchArguments":[{"group":{"start":8,"value":"\"Near Times Square, NYC\"","children":[{"start":9,"value":"Near Times Square, NYC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then Google Maps should open in a new tab","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When I click the \"Order for Pickup\" button in the hero","stepMatchArguments":[{"group":{"start":12,"value":"\"Order for Pickup\"","children":[{"start":13,"value":"Order for Pickup","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":40,"pickleLine":35,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I click the \"View Menu\" button in the hero","stepMatchArguments":[{"group":{"start":12,"value":"\"View Menu\"","children":[{"start":13,"value":"View Menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/menu\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/menu\"","children":[{"start":26,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":45,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then I should see food photos of laghman and kawap","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":52,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the hero layout should be stacked vertically","stepMatchArguments":[]}]},
  {"pwTestLine":56,"pickleLine":48,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":58,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When I view the hero section","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the hero layout should be side-by-side","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":55,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When I scroll to the featured dishes section","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then I should see between 3 and 6 featured menu items","stepMatchArguments":[{"group":{"start":21,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":27,"value":"6","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":67,"pickleLine":59,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When I scroll to the featured dishes section","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then each featured dish card should show an image","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And each card should show the English name","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And each card should show the Chinese name","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"And each card should show the price","stepMatchArguments":[]}]},
  {"pwTestLine":77,"pickleLine":72,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When I view the featured dish \"Big Plate Chicken Laghman\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Big Plate Chicken Laghman\"","children":[{"start":26,"value":"Big Plate Chicken Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":79,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"大盘鸡拌面\"","stepMatchArguments":[{"group":{"start":30,"value":"\"大盘鸡拌面\"","children":[{"start":31,"value":"大盘鸡拌面","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":82,"pickleLine":73,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When I view the featured dish \"Uyghur Polo\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Uyghur Polo\"","children":[{"start":26,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"手抓饭\"","stepMatchArguments":[{"group":{"start":30,"value":"\"手抓饭\"","children":[{"start":31,"value":"手抓饭","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":87,"pickleLine":74,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When I view the featured dish \"Lamb Samsa\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Lamb Samsa\"","children":[{"start":26,"value":"Lamb Samsa","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"烤包子\"","stepMatchArguments":[{"group":{"start":30,"value":"\"烤包子\"","children":[{"start":31,"value":"烤包子","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":94,"pickleLine":76,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":96,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When I scroll to the featured dishes section","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the featured dishes should be horizontally scrollable","stepMatchArguments":[]}]},
  {"pwTestLine":100,"pickleLine":81,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":102,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"When I scroll to the featured dishes section","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"Then the featured dishes should be displayed in a 3-column grid","stepMatchArguments":[]}]},
  {"pwTestLine":106,"pickleLine":88,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I scroll to the freshly made section","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then I should see the heading \"Freshly Made for Every Order\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Freshly Made for Every Order\"","children":[{"start":26,"value":"Freshly Made for Every Order","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":111,"pickleLine":92,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When I scroll to the freshly made section","stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":94,"keywordType":"Outcome","textWithKeyword":"Then I should see animated GIF circles in circular frames with consistent sizing","stepMatchArguments":[]}]},
  {"pwTestLine":116,"pickleLine":98,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When I scroll to the reviews section","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then I should see 3 to 4 Google reviews","stepMatchArguments":[{"group":{"start":13,"value":"3","children":[]},"parameterTypeName":"int"},{"group":{"start":18,"value":"4","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":119,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"And each review should show a star rating, reviewer name, review text, and date","stepMatchArguments":[]}]},
  {"pwTestLine":122,"pickleLine":103,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":104,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":124,"gherkinStepLine":105,"keywordType":"Action","textWithKeyword":"When I scroll to the reviews section","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":106,"keywordType":"Outcome","textWithKeyword":"Then the reviews should be displayed in a carousel format","stepMatchArguments":[]}]},
  {"pwTestLine":128,"pickleLine":108,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":130,"gherkinStepLine":110,"keywordType":"Action","textWithKeyword":"When I scroll to the reviews section","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":111,"keywordType":"Outcome","textWithKeyword":"Then the reviews should be displayed in a grid layout","stepMatchArguments":[]}]},
  {"pwTestLine":134,"pickleLine":113,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":114,"keywordType":"Context","textWithKeyword":"Given the Google Places API is unavailable","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":115,"keywordType":"Action","textWithKeyword":"When the homepage loads","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":116,"keywordType":"Outcome","textWithKeyword":"Then the reviews section should be hidden or show a fallback","stepMatchArguments":[]}]},
  {"pwTestLine":140,"pickleLine":120,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":121,"keywordType":"Action","textWithKeyword":"When I scroll to the order platforms section","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":122,"keywordType":"Outcome","textWithKeyword":"Then I should see branded links for \"DoorDash\", \"Uber Eats\", and \"Grubhub\"","stepMatchArguments":[{"group":{"start":31,"value":"\"DoorDash\"","children":[{"start":32,"value":"DoorDash","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":43,"value":"\"Uber Eats\"","children":[{"start":44,"value":"Uber Eats","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"Grubhub\"","children":[{"start":61,"value":"Grubhub","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":145,"pickleLine":124,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":146,"gherkinStepLine":125,"keywordType":"Action","textWithKeyword":"When I click the \"DoorDash\" platform link","stepMatchArguments":[{"group":{"start":12,"value":"\"DoorDash\"","children":[{"start":13,"value":"DoorDash","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":147,"gherkinStepLine":126,"keywordType":"Outcome","textWithKeyword":"Then it should open in a new tab with the correct URL","stepMatchArguments":[]}]},
  {"pwTestLine":150,"pickleLine":130,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":151,"gherkinStepLine":131,"keywordType":"Action","textWithKeyword":"When I scroll to the about teaser section","stepMatchArguments":[]},{"pwStepLine":152,"gherkinStepLine":132,"keywordType":"Outcome","textWithKeyword":"Then I should see a brief paragraph about Uyghur cuisine","stepMatchArguments":[]}]},
  {"pwTestLine":155,"pickleLine":134,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":135,"keywordType":"Action","textWithKeyword":"When I click the \"Learn More\" link in the about teaser","stepMatchArguments":[{"group":{"start":12,"value":"\"Learn More\"","children":[{"start":13,"value":"Learn More","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":157,"gherkinStepLine":136,"keywordType":"Outcome","textWithKeyword":"Then I should be navigated to \"/about\"","stepMatchArguments":[{"group":{"start":25,"value":"\"/about\"","children":[{"start":26,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":160,"pickleLine":140,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":161,"gherkinStepLine":141,"keywordType":"Action","textWithKeyword":"When I scroll to the location strip","stepMatchArguments":[]},{"pwStepLine":162,"gherkinStepLine":142,"keywordType":"Outcome","textWithKeyword":"Then I should see a map thumbnail","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":143,"keywordType":"Outcome","textWithKeyword":"And I should see the restaurant address","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":144,"keywordType":"Outcome","textWithKeyword":"And I should see a phone number","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":145,"keywordType":"Outcome","textWithKeyword":"And I should see restaurant hours","stepMatchArguments":[]},{"pwStepLine":166,"gherkinStepLine":146,"keywordType":"Outcome","textWithKeyword":"And I should see an open/closed badge","stepMatchArguments":[]}]},
  {"pwTestLine":169,"pickleLine":148,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":149,"keywordType":"Action","textWithKeyword":"When I click the address in the location strip","stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":150,"keywordType":"Outcome","textWithKeyword":"Then Google Maps should open in a new tab","stepMatchArguments":[]}]},
  {"pwTestLine":174,"pickleLine":152,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":175,"gherkinStepLine":153,"keywordType":"Action","textWithKeyword":"When I inspect the phone number in the location strip","stepMatchArguments":[]},{"pwStepLine":176,"gherkinStepLine":154,"keywordType":"Outcome","textWithKeyword":"Then the phone link href should start with \"tel:\"","stepMatchArguments":[{"group":{"start":38,"value":"\"tel:\"","children":[{"start":39,"value":"tel:","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":179,"pickleLine":156,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"When I view the location strip","stepMatchArguments":[]},{"pwStepLine":181,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the open/closed badge should reflect the current status from siteConfig","stepMatchArguments":[]}]},
  {"pwTestLine":184,"pickleLine":162,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":185,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"When I inspect all images on the homepage","stepMatchArguments":[]},{"pwStepLine":186,"gherkinStepLine":164,"keywordType":"Outcome","textWithKeyword":"Then every image should have a non-empty alt attribute","stepMatchArguments":[]}]},
  {"pwTestLine":191,"pickleLine":174,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":192,"gherkinStepLine":167,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":193,"gherkinStepLine":168,"keywordType":"Action","textWithKeyword":"When the homepage loads","stepMatchArguments":[]},{"pwStepLine":194,"gherkinStepLine":169,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":195,"gherkinStepLine":170,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]}]},
  {"pwTestLine":198,"pickleLine":175,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":199,"gherkinStepLine":167,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":200,"gherkinStepLine":168,"keywordType":"Action","textWithKeyword":"When the homepage loads","stepMatchArguments":[]},{"pwStepLine":201,"gherkinStepLine":169,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":202,"gherkinStepLine":170,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]}]},
  {"pwTestLine":205,"pickleLine":176,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":206,"gherkinStepLine":167,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":207,"gherkinStepLine":168,"keywordType":"Action","textWithKeyword":"When the homepage loads","stepMatchArguments":[]},{"pwStepLine":208,"gherkinStepLine":169,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":209,"gherkinStepLine":170,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]}]},
]; // bdd-data-end