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
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash("success", "Welcome Back to TheCampingSpot");
    const redirectURL = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectURL);
});


//GET ROUTE: Logout:
router.get("/logout", function (req, res, next) {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        req.flash("success", "You have Successfully Logged out!")
        res.redirect("/campgrounds");
    })
})

module.exports = router;