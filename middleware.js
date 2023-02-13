//Imported Models:
const { campgroundSchema } = require("./schemas.js");
const Campground = require("./models/campground");

//Imported Error Handling Utilities:
const ExpressError = require("./utils/ExpressError");

//-----------------------------------------------------------------------------------------------------------------
//Login Middleware: Persistent login to Use Certain Routes:
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
}

//CAMPGROUND MIDDLEWARE:
//-----------------------------------------------------------------------------------------------------------------
//Serverside Validation Function for Campgrounds:
module.exports.validateCampground = (req, res, next) => {
    //If Error in Schema Validation which results in error in req.body: 
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(element => element.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

//Checking Ownership of Campground to make changes to it:
module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission!")
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}


//-----------------------------------------------------------------------------------------------------------------