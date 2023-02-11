const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

const catchAsync = require("../utils/catchAsync");


//USER ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//GET ROUTE: serving a registration form:
router.get("/register", (req, res) => {
    res.render("./users/register");
})

//POST ROUTE: creating a user on submission of registration form
router.post("/register", catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.flash("success", "Welcome to TheCampingSpot");
        res.redirect("/campgrounds");
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
    req.flash("success" , "Welcome Back to TheCampingSpot");
    res.redirect("/campgrounds");
});


module.exports = router;