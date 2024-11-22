const portfinder = require("portfinder");
const puppeter = require("puppeteer");

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
  const browser = await puppeter.launch();
  const page = await browser.newPage();

  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);
  expect(page.url()).toBe(`http://localhost:${port}/about`);

  await browser.close();
});
