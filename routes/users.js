const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("./users/register");
})

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to TheCampingSpot");
    res.redirect("/campgrounds");
})

module.exports = router;