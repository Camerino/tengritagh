// Generated from: tests/features/sprint-1/menu.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Menu Page', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the restaurant website is loaded', null, { page }); 
    await And('I navigate to "/menu"', null, { page }); 
  });
  
  test('Category tab bar is displayed', async ({ When, Then, page }) => { 
    await When('I view the top of the menu page', null, { page }); 
    await Then('I should see a horizontal category tab bar', null, { page }); 
  });

  test('All categories are loaded from database', async ({ When, Then, page }) => { 
    await When('I view the category tabs', null, { page }); 
    await Then('I should see at minimum: Laghman, Polo, Kebabs, Samsa, Nan, Soups, Salads, Drinks, Desserts', null, { page }); 
  });

  test('Tapping a category filters menu items', async ({ When, Then, page }) => { 
    await When('I tap the "Kebabs" category tab', null, { page }); 
    await Then('only kebab items should be displayed', null, { page }); 
  });

  test('Active category tab is highlighted', async ({ When, Then, page }) => { 
    await When('I tap the "Polo" category tab', null, { page }); 
    await Then('the "Polo" tab should have a terracotta visual highlight', null, { page }); 
  });

  test('Category tabs scroll horizontally on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('the categories overflow the viewport', null, { page }); 
    await Then('the category tabs should be horizontally scrollable', null, { page }); 
  });

  test('Menu items in 2-column grid on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I view the menu items', null, { page }); 
    await Then('the items should be displayed in a 2-column grid', null, { page }); 
  });

  test('Menu items in 3-column grid on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I view the menu items', null, { page }); 
    await Then('the items should be displayed in a 3-column grid', null, { page }); 
  });

  test('Menu card shows bilingual names and details', async ({ When, Then, And, page }) => { 
    await When('I view a menu item card', null, { page }); 
    await Then('I should see the English name in bold', null, { page }); 
    await And('I should see the Chinese name in smaller text below', null, { page }); 
    await And('I should see a description truncated to 2 lines', null, { page }); 
    await And('I should see the price', null, { page }); 
  });

  test.describe('Menu items show correct Chinese names', () => {

    test('Example #1', async ({ When, Then, page }) => { 
      await When('I look at the menu item "Gouyourou Laghman"', null, { page }); 
      await Then('I should see the Chinese name "过油肉拌面"', null, { page }); 
    });

    test('Example #2', async ({ When, Then, page }) => { 
      await When('I look at the menu item "Suoman"', null, { page }); 
      await Then('I should see the Chinese name "炒面"', null, { page }); 
    });

    test('Example #3', async ({ When, Then, page }) => { 
      await When('I look at the menu item "Big Plate Chicken Laghman"', null, { page }); 
      await Then('I should see the Chinese name "大盘鸡拌面"', null, { page }); 
    });

    test('Example #4', async ({ When, Then, page }) => { 
      await When('I look at the menu item "Uyghur Polo"', null, { page }); 
      await Then('I should see the Chinese name "手抓饭"', null, { page }); 
    });

    test('Example #5', async ({ When, Then, page }) => { 
      await When('I look at the menu item "Lamb Samsa"', null, { page }); 
      await Then('I should see the Chinese name "烤包子"', null, { page }); 
    });

    test('Example #6', async ({ When, Then, page }) => { 
      await When('I look at the menu item "Plain Nan"', null, { page }); 
      await Then('I should see the Chinese name "馕"', null, { page }); 
    });

  });

  test('Featured items display POPULAR badge', async ({ When, Then, page }) => { 
    await When('I view a menu item that is marked as featured', null, { page }); 
    await Then('I should see a "POPULAR" badge with gold background and charcoal text', null, { page }); 
  });

  test('Add to Cart button is rendered on each card', async ({ When, Then, page }) => { 
    await When('I view a menu item card', null, { page }); 
    await Then('I should see an "Add to Cart" button with terracotta background', null, { page }); 
  });

  test('Placeholder shown for items without image', async ({ Given, When, Then, page }) => { 
    await Given('a menu item has no image URL'); 
    await When('I view that menu item card', null, { page }); 
    await Then('a placeholder image or gradient background should be shown', null, { page }); 
  });

  test('Unavailable items are indicated', async ({ Given, When, Then, page }) => { 
    await Given('a menu item is marked as unavailable'); 
    await When('I view the menu', null, { page }); 
    await Then('the item should be greyed out with "Unavailable" text or hidden', null, { page }); 
  });

  test('Page title is correct', async ({ When, Then, page }) => { 
    await When('I check the document title', null, { page }); 
    await Then('it should be "Menu | Tengri Tagh Uyghur Cuisine"', null, { page }); 
  });

  test('All menu item images have alt text', async ({ When, Then, page }) => { 
    await When('I inspect all menu item images', null, { page }); 
    await Then('each image should have descriptive alt text matching the dish name', null, { page }); 
  });

  test.describe('Menu page is fully responsive', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('the menu page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all content should be readable', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('the menu page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all content should be readable', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, And, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('the menu page loads', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all content should be readable', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-1/menu.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I view the top of the menu page","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then I should see a horizontal category tab bar","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I view the category tabs","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then I should see at minimum: Laghman, Polo, Kebabs, Samsa, Nan, Soups, Salads, Drinks, Desserts","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I tap the \"Kebabs\" category tab","stepMatchArguments":[{"group":{"start":10,"value":"\"Kebabs\"","children":[{"start":11,"value":"Kebabs","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then only kebab items should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":24,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I tap the \"Polo\" category tab","stepMatchArguments":[{"group":{"start":10,"value":"\"Polo\"","children":[{"start":11,"value":"Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then the \"Polo\" tab should have a terracotta visual highlight","stepMatchArguments":[{"group":{"start":4,"value":"\"Polo\"","children":[{"start":5,"value":"Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":31,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":33,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When the categories overflow the viewport","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the category tabs should be horizontally scrollable","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":35,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":39,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When I view the menu items","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the items should be displayed in a 2-column grid","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":45,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I view the menu items","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the items should be displayed in a 3-column grid","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":45,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":50,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When I view a menu item card","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then I should see the English name in bold","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And I should see the Chinese name in smaller text below","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"And I should see a description truncated to 2 lines","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"And I should see the price","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":58,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I look at the menu item \"Gouyourou Laghman\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Gouyourou Laghman\"","children":[{"start":25,"value":"Gouyourou Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"过油肉拌面\"","stepMatchArguments":[{"group":{"start":30,"value":"\"过油肉拌面\"","children":[{"start":31,"value":"过油肉拌面","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":64,"pickleLine":59,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I look at the menu item \"Suoman\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Suoman\"","children":[{"start":25,"value":"Suoman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"炒面\"","stepMatchArguments":[{"group":{"start":30,"value":"\"炒面\"","children":[{"start":31,"value":"炒面","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":69,"pickleLine":60,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I look at the menu item \"Big Plate Chicken Laghman\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Big Plate Chicken Laghman\"","children":[{"start":25,"value":"Big Plate Chicken Laghman","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":71,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"大盘鸡拌面\"","stepMatchArguments":[{"group":{"start":30,"value":"\"大盘鸡拌面\"","children":[{"start":31,"value":"大盘鸡拌面","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":74,"pickleLine":61,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I look at the menu item \"Uyghur Polo\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Uyghur Polo\"","children":[{"start":25,"value":"Uyghur Polo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"手抓饭\"","stepMatchArguments":[{"group":{"start":30,"value":"\"手抓饭\"","children":[{"start":31,"value":"手抓饭","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":79,"pickleLine":62,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":80,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I look at the menu item \"Lamb Samsa\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Lamb Samsa\"","children":[{"start":25,"value":"Lamb Samsa","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"烤包子\"","stepMatchArguments":[{"group":{"start":30,"value":"\"烤包子\"","children":[{"start":31,"value":"烤包子","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":84,"pickleLine":63,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":85,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I look at the menu item \"Plain Nan\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Plain Nan\"","children":[{"start":25,"value":"Plain Nan","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the Chinese name \"馕\"","stepMatchArguments":[{"group":{"start":30,"value":"\"馕\"","children":[{"start":31,"value":"馕","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":91,"pickleLine":65,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":92,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When I view a menu item that is marked as featured","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then I should see a \"POPULAR\" badge with gold background and charcoal text","stepMatchArguments":[{"group":{"start":15,"value":"\"POPULAR\"","children":[{"start":16,"value":"POPULAR","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":96,"pickleLine":69,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When I view a menu item card","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then I should see an \"Add to Cart\" button with terracotta background","stepMatchArguments":[{"group":{"start":16,"value":"\"Add to Cart\"","children":[{"start":17,"value":"Add to Cart","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":101,"pickleLine":73,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":102,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"Given a menu item has no image URL","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When I view that menu item card","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then a placeholder image or gradient background should be shown","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":78,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":108,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"Given a menu item is marked as unavailable","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When I view the menu","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the item should be greyed out with \"Unavailable\" text or hidden","stepMatchArguments":[{"group":{"start":35,"value":"\"Unavailable\"","children":[{"start":36,"value":"Unavailable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":113,"pickleLine":85,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":114,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When I check the document title","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then it should be \"Menu | Tengri Tagh Uyghur Cuisine\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Menu | Tengri Tagh Uyghur Cuisine\"","children":[{"start":14,"value":"Menu | Tengri Tagh Uyghur Cuisine","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":118,"pickleLine":89,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":119,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"When I inspect all menu item images","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then each image should have descriptive alt text matching the dish name","stepMatchArguments":[]}]},
  {"pwTestLine":125,"pickleLine":101,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":126,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":127,"gherkinStepLine":95,"keywordType":"Action","textWithKeyword":"When the menu page loads","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":96,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"And all content should be readable","stepMatchArguments":[]}]},
  {"pwTestLine":132,"pickleLine":102,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":133,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":134,"gherkinStepLine":95,"keywordType":"Action","textWithKeyword":"When the menu page loads","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":96,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"And all content should be readable","stepMatchArguments":[]}]},
  {"pwTestLine":139,"pickleLine":103,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to \"/menu\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":140,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":141,"gherkinStepLine":95,"keywordType":"Action","textWithKeyword":"When the menu page loads","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":96,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"And all content should be readable","stepMatchArguments":[]}]},
]; // bdd-data-end