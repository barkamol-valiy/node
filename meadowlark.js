var express = require("express");
const ExpressHandlebars = require("express3-handlebars/lib/express-handlebars");
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
var app = express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

// todo some data
const data = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

// /routes
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  var randomData = data[Math.floor(Math.random() * data.length)];
  res.render("about", { data: randomData });
});

//!MIDDLEWARE
app.use(express.static(__dirname + "/public"));

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

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
