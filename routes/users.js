const express = require("express");
const router = express.Router();
const passport = require("passport");

// Imported Controllers:
const users = require("../controllers/users");

// Imported Models:
const User = require("../models/user");

const catchAsync = require("../utils/catchAsync");


//USER ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//GET ROUTE: serving a registration form:
router.get("/register", users.renderRegister);

//POST ROUTE: creating a user on submission of registration form
router.post("/register", catchAsync(users.register));


//GET ROUTE: serving a login form:
router.get("/login", users.renderLogin);


//POST ROUTE: Creating a login using the login form:
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);


//GET ROUTE: Logout:
router.get("/logout", users.logout);

module.exports = router;