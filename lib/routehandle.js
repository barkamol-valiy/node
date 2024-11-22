const fortune = require("../module/fortune");

exports.home = (req, res) => {
  res.render("home");
};

exports.about = (req, res) => {
  res.render("about", { data: fortune.getFortune() });
};

exports.notFound = (req, res) => {
  res.render("404");
};

exports.internalError = (err, req, res, next) => res.render("500");
