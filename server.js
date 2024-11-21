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

// /routes

app.get("/", handler.home);

app.get("/about", handler.about);

// middleware

app.use(express.static(__dirname + "/public"));

app.use(handler.notFound);

//error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500internalError");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl+C to terminate..."
  );
});
