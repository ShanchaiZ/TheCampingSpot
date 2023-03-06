//Imported Models:
const User = require("../models/user");


//GET ROUTE: serving a registration form to a User
module.exports.renderRegister = (req, res) => {
    res.render("./users/register");
}

//POST ROUTE: Creating a user on submission of registration form
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

//GET ROUTE: Serving a login form:
module.exports.renderLogin = (req, res) => {
    if(req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render("users/login");
}


//POST ROUTE: User Log in:
module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back to TheCampingSpot");
    const redirectURL = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectURL);
}


//GET ROUTE: User Logout:
module.exports.logout = function (req, res, next) {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        req.flash("success", "You have Successfully Logged out!")
        res.redirect("/campgrounds");
    })
}