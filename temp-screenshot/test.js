const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 1 });
  await page.goto('file://' + process.cwd().replace(/\\/g, '/') + '/align.html');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'align-test.png' });
  await browser.close();
})();
