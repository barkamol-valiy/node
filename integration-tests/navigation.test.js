const portfinder = require("portfinder");
const puppeteer = require("puppeteer"); // Corrected the typo here

const app = require("../server");

let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

test("homepage links to about page", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the homepage before interacting with any elements
  await page.goto(`http://localhost:${port}`);

  // Wait for the 'About' link to be available
  await page.waitForSelector('[data-test-id="about"]');

  // Wait for the page to navigate after clicking the 'About' link
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);

  // Ensure the correct URL is loaded after navigation
  expect(page.url()).toBe(`http://localhost:${port}/about`);

  await browser.close();
});
