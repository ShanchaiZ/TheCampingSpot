//Imported Models:
const User = require("../models/user");


//GET ROUTE: serving a registration form to a User
module.exports.renderRegister = (req, res) => {
    res.render("./users/register");
}

//POST ROUTE: creating a user on submission of registration form
module.exports.register = async (req, res, next) => {
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
}


//GET ROUTE: serving a login form:
module.exports.renderLogin = (req, res) => {
    res.render("users/login");
}

