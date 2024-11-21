const handler = require("../routehandle");

test("home page renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  handler.home(req, res);
  expect(res.render.mock.calls[0][0]).toBe("home");
});
