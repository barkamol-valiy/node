const express = require("express");
const path = require("path");
const handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});

const handler = require("./lib/routehandle");

const app = express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);
const port = app.get("port");

// / Routes
app.get("/", handler.home);
app.get("/about", handler.about);

// : Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(handler.notFound);

// Error Handling
app.use(handler.internalError);

// Start Server
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
    );
  });
} else {
  module.exports = app;
}
