const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const filePath = path.resolve(__dirname, "../outputs/insha-traders/index.html");
  await page.goto(`file:///${filePath.replace(/\\/g, "/")}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".hero-content h1", { timeout: 10000 });
  await page.waitForSelector("#services .service-card", { timeout: 10000 });
  await page.waitForSelector("#portfolio .gallery-item", { timeout: 10000 });
  await page.screenshot({ path: path.resolve(__dirname, "insha-traders-smoke.png"), fullPage: false });
  const result = await page.evaluate(() => ({
    title: document.title,
    services: document.querySelectorAll(".service-card").length,
    gallery: document.querySelectorAll(".gallery-item").length,
    form: Boolean(document.querySelector("#inquiryForm"))
  }));
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});