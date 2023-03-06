const express = require("express");
const router = express.Router();
const passport = require("passport");

// Imported Controllers:
const users = require("../controllers/users");
const { checkReturnTo } = require("../middleware");

// Imported Models:
const User = require("../models/user");

const catchAsync = require("../utils/catchAsync");


//USER ROUTES: 
//-----------------------------------------------------------------------------------------------------------------
// Routes are prefixed by PORT/campgrounds...

//Registration Route:
router.route("/register")
    //GET ROUTE: serving a registration form:
    .get(users.renderRegister)
    //POST ROUTE: creating a user on submission of registration form
    .post(catchAsync(users.register));


// Login Route:
router.route("/login")
    //GET ROUTE: serving a login form:
    .get(users.renderLogin)
    //POST ROUTE: Creating a login using the login form:
    .post(checkReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

//GET ROUTE: Logout:
router.get("/logout", users.logout);

module.exports = router;