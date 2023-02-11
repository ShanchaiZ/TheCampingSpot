const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");


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


module.exports = router;