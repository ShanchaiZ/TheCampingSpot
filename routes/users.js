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
router.post("/register", catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => { //passport helper that make user registration count as a login!
            if (err) return next(err);
            req.flash("success", "Welcome to TheCampingSpot");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
}));


//GET ROUTE: serving a login form:
router.get("/login", (req, res) => {
    res.render("users/login");
})


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