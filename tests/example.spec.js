const { test, expect } = require('@playwright/test');

test('hero section screenshot', async ({ page }) => {
  await page.goto('index.html');
  const hero = await page.$('.hero');
  expect(await hero.screenshot()).toMatchSnapshot('hero.png');
});
