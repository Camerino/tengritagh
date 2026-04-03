// Generated from: tests/features/sprint-1/responsive.feature
import { test } from "../../../../tests/steps/fixtures.ts";

test.describe('Responsive Design', () => {

  test.describe('Homepage renders without overflow at <width>px', () => {

    test('Homepage renders without overflow at 375px', async ({ Given, When, Then, And, page }) => { 
      await Given('the restaurant website is loaded', null, { page }); 
      await And('I am viewing the site at 375px viewport width', null, { page }); 
      await When('I navigate to "/"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
      await And('the header and footer should be visible', null, { page }); 
    });

    test('Homepage renders without overflow at 768px', async ({ Given, When, Then, And, page }) => { 
      await Given('the restaurant website is loaded', null, { page }); 
      await And('I am viewing the site at 768px viewport width', null, { page }); 
      await When('I navigate to "/"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
      await And('the header and footer should be visible', null, { page }); 
    });

    test('Homepage renders without overflow at 1280px', async ({ Given, When, Then, And, page }) => { 
      await Given('the restaurant website is loaded', null, { page }); 
      await And('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I navigate to "/"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
      await And('all text should be readable', null, { page }); 
      await And('the header and footer should be visible', null, { page }); 
    });

  });

  test('Homepage hero stacks on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the hero section content should be stacked vertically', null, { page }); 
  });

  test('Homepage hero is side-by-side on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await Then('the hero section should use a side-by-side layout', null, { page }); 
  });

  test('Featured dishes scroll on mobile', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await And('I scroll to the featured dishes section', null, { page }); 
    await Then('the dishes should be horizontally scrollable', null, { page }); 
  });

  test('Featured dishes grid on desktop', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I navigate to "/"', null, { page }); 
    await And('I scroll to the featured dishes section', null, { page }); 
    await Then('the dishes should be in a 3-column grid', null, { page }); 
  });

  test('Menu 2-column grid on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/menu"', null, { page }); 
    await Then('menu items should be in a 2-column grid', null, { page }); 
  });

  test('Menu 3-column grid on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I navigate to "/menu"', null, { page }); 
    await Then('menu items should be in a 3-column grid', null, { page }); 
  });

  test('Menu category tabs scrollable on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/menu"', null, { page }); 
    await Then('the category tabs should be horizontally scrollable', null, { page }); 
  });

  test('About values stack on mobile', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/about"', null, { page }); 
    await And('I scroll to the values section', null, { page }); 
    await Then('the values should be stacked vertically', null, { page }); 
  });

  test('About values row on desktop', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I navigate to "/about"', null, { page }); 
    await And('I scroll to the values section', null, { page }); 
    await Then('the values should be in a 3-column row', null, { page }); 
  });

  test('Location stacks on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I navigate to "/location"', null, { page }); 
    await Then('the map and contact info should be stacked vertically', null, { page }); 
  });

  test('Location side-by-side on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I navigate to "/location"', null, { page }); 
    await Then('the map and contact info should be side-by-side', null, { page }); 
  });

  test('Desktop shows horizontal nav', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I view any page', null, { page }); 
    await Then('the header should show horizontal navigation links', null, { page }); 
    await And('the hamburger menu should be hidden', null, { page }); 
  });

  test('Mobile shows hamburger nav', async ({ Given, When, Then, And, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I view any page', null, { page }); 
    await Then('the hamburger menu icon should be visible', null, { page }); 
    await And('the horizontal navigation links should be hidden', null, { page }); 
  });

  test('Footer stacks on mobile', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 375px viewport width', null, { page }); 
    await When('I scroll to the footer', null, { page }); 
    await Then('the footer sections should be stacked vertically', null, { page }); 
  });

  test('Footer multi-column on desktop', async ({ Given, When, Then, page }) => { 
    await Given('I am viewing the site at 1280px viewport width', null, { page }); 
    await When('I scroll to the footer', null, { page }); 
    await Then('the footer sections should be in a multi-column layout', null, { page }); 
  });

  test.describe('No overflow on <path> at <width>px', () => {

    test('No overflow on / at 375px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('I navigate to "/"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /menu at 375px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /about at 375px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('I navigate to "/about"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /location at 375px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 375px viewport width', null, { page }); 
      await When('I navigate to "/location"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on / at 768px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('I navigate to "/"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /menu at 768px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /about at 768px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('I navigate to "/about"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /location at 768px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 768px viewport width', null, { page }); 
      await When('I navigate to "/location"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on / at 1280px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I navigate to "/"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /menu at 1280px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I navigate to "/menu"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /about at 1280px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I navigate to "/about"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

    test('No overflow on /location at 1280px', async ({ Given, When, Then, page }) => { 
      await Given('I am viewing the site at 1280px viewport width', null, { page }); 
      await When('I navigate to "/location"', null, { page }); 
      await Then('there should be no horizontal overflow', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/sprint-1/responsive.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the header and footer should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":19,"tags":[],"steps":[{"pwStepLine":18,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the header and footer should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":27,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the restaurant website is loaded","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":29,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And all text should be readable","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the header and footer should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":38,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":39,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the hero section content should be stacked vertically","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":44,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":45,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then the hero section should use a side-by-side layout","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":50,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":51,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And I scroll to the featured dishes section","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the dishes should be horizontally scrollable","stepMatchArguments":[]}]},
  {"pwTestLine":56,"pickleLine":38,"tags":[],"steps":[{"pwStepLine":57,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":58,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"And I scroll to the featured dishes section","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then the dishes should be in a 3-column grid","stepMatchArguments":[]}]},
  {"pwTestLine":63,"pickleLine":46,"tags":[],"steps":[{"pwStepLine":64,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":65,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then menu items should be in a 2-column grid","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":51,"tags":[],"steps":[{"pwStepLine":70,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":71,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":72,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then menu items should be in a 3-column grid","stepMatchArguments":[]}]},
  {"pwTestLine":75,"pickleLine":56,"tags":[],"steps":[{"pwStepLine":76,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":77,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":78,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"Then the category tabs should be horizontally scrollable","stepMatchArguments":[]}]},
  {"pwTestLine":81,"pickleLine":63,"tags":[],"steps":[{"pwStepLine":82,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":83,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the values should be stacked vertically","stepMatchArguments":[]}]},
  {"pwTestLine":88,"pickleLine":69,"tags":[],"steps":[{"pwStepLine":89,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":90,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"And I scroll to the values section","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then the values should be in a 3-column row","stepMatchArguments":[]}]},
  {"pwTestLine":95,"pickleLine":77,"tags":[],"steps":[{"pwStepLine":96,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":97,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then the map and contact info should be stacked vertically","stepMatchArguments":[]}]},
  {"pwTestLine":101,"pickleLine":82,"tags":[],"steps":[{"pwStepLine":102,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":103,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then the map and contact info should be side-by-side","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":89,"tags":[],"steps":[{"pwStepLine":108,"gherkinStepLine":90,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":109,"gherkinStepLine":91,"keywordType":"Action","textWithKeyword":"When I view any page","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"Then the header should show horizontal navigation links","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"And the hamburger menu should be hidden","stepMatchArguments":[]}]},
  {"pwTestLine":114,"pickleLine":95,"tags":[],"steps":[{"pwStepLine":115,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":116,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When I view any page","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":98,"keywordType":"Outcome","textWithKeyword":"Then the hamburger menu icon should be visible","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"And the horizontal navigation links should be hidden","stepMatchArguments":[]}]},
  {"pwTestLine":121,"pickleLine":103,"tags":[],"steps":[{"pwStepLine":122,"gherkinStepLine":104,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":123,"gherkinStepLine":105,"keywordType":"Action","textWithKeyword":"When I scroll to the footer","stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":106,"keywordType":"Outcome","textWithKeyword":"Then the footer sections should be stacked vertically","stepMatchArguments":[]}]},
  {"pwTestLine":127,"pickleLine":108,"tags":[],"steps":[{"pwStepLine":128,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":129,"gherkinStepLine":110,"keywordType":"Action","textWithKeyword":"When I scroll to the footer","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":111,"keywordType":"Outcome","textWithKeyword":"Then the footer sections should be in a multi-column layout","stepMatchArguments":[]}]},
  {"pwTestLine":135,"pickleLine":122,"tags":[],"steps":[{"pwStepLine":136,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":137,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":138,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":141,"pickleLine":123,"tags":[],"steps":[{"pwStepLine":142,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":143,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":144,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":147,"pickleLine":124,"tags":[],"steps":[{"pwStepLine":148,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":149,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":150,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":153,"pickleLine":125,"tags":[],"steps":[{"pwStepLine":154,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 375px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":155,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":156,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":159,"pickleLine":126,"tags":[],"steps":[{"pwStepLine":160,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":161,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":162,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":165,"pickleLine":127,"tags":[],"steps":[{"pwStepLine":166,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":167,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":168,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":171,"pickleLine":128,"tags":[],"steps":[{"pwStepLine":172,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":173,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":174,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":177,"pickleLine":129,"tags":[],"steps":[{"pwStepLine":178,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 768px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"768","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":179,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":180,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":183,"pickleLine":130,"tags":[],"steps":[{"pwStepLine":184,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":185,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/\"","children":[{"start":15,"value":"/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":186,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":189,"pickleLine":131,"tags":[],"steps":[{"pwStepLine":190,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":191,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/menu\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/menu\"","children":[{"start":15,"value":"/menu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":192,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":195,"pickleLine":132,"tags":[],"steps":[{"pwStepLine":196,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":197,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/about\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/about\"","children":[{"start":15,"value":"/about","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":198,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
  {"pwTestLine":201,"pickleLine":133,"tags":[],"steps":[{"pwStepLine":202,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"Given I am viewing the site at 1280px viewport width","stepMatchArguments":[{"group":{"start":25,"value":"1280","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":203,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When I navigate to \"/location\"","stepMatchArguments":[{"group":{"start":14,"value":"\"/location\"","children":[{"start":15,"value":"/location","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":204,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then there should be no horizontal overflow","stepMatchArguments":[]}]},
]; // bdd-data-end