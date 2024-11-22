var express = require("express");
const ExpressHandlebars = require("express3-handlebars/lib/express-handlebars");
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});

const handler = require("./lib/routehandle");

var app = express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);
const port = app.get("port");

// /routes

app.get("/", handler.home);

app.get("/about", handler.about);

// middleware

app.use(express.static(__dirname + "/public"));

app.use(handler.notFound);

//error handling
app.use(handler.internalError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
