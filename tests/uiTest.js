const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://google.com');
  await page.keyboard.type('Teste Google')
  await page.keyboard.press('Enter')

  await page.screenshot({path: 'example.png'});
 
  await browser.close();
})();