const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard");
});

router.get("/products", (req, res) => {
  res.render("admin/products");
});

router.get("/users", (req, res) => {
  res.render("admin/users");
});

router.get("/tables", (req, res) => {
  res.render("admin/tables");
});

router.get("/forms", (req, res) => {
  res.render("admin/forms");
});

router.get("/form-wizard", (req, res) => {
  res.render("admin/form-wizard");
});

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.get("/register", (req, res) => {
  res.render("admin/register");
});

router.get("/error-404", (req, res) => {
  res.render("admin/error-404");
});

module.exports = router;