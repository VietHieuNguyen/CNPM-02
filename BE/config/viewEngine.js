const path = require("path");
const express = require("express");
module.exports.configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "..", "views"));
};
