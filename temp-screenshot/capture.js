const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
  const page = await browser.newPage();
  await page.setViewport({ width: 428, height: 926, deviceScaleFactor: 2 });
  await page.goto('file://' + process.cwd().replace(/\\/g, '/') + '/../public/udhar-khata-prototype.html');
  await new Promise(r => setTimeout(r, 2000));
  const element = await page.$('.device');
  await element.screenshot({ path: '../public/projects/udhar-khata-screenshot.png' });
  await browser.close();
})();
