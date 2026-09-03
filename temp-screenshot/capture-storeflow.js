const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
  await page.goto('file://' + process.cwd().replace(/\\/g, '/') + '/public/storeflow-presentation.html');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/projects/storeflow-mockup.jpg', type: 'jpeg', quality: 95 });
  await browser.close();
})();
