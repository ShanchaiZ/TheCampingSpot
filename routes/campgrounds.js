//Installed Dependencies:
const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

//Imported Models:
const { campgroundSchema } = require("../schemas.js");
const Campground = require("../models/campground");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");


//CAMPGROUND MIDDLEWARE:
//-----------------------------------------------------------------------------------------------------------------

//Serverside Validation Function for Campgrounds:
const validateCampground = (req, res, next) => {
    //If Error in Schema Validation which results in error in req.body: 
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(element => element.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

//CAMPGROUND ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//INDEX ROUTE: lists all the campgrounds available:
router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}));


//GET ROUTE: Form Creation
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});


//POST ROUTE: Where the form will be submitted after submitting the Form Creation
router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    //If no body.req created and bootstrap form validation is bypassed:
    // if (!req.body.campground) throw new ExpressError("Invalid Data for New Campground Creation", 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Campground Successfully Created!"); //flash smg("key" ,"message");
    res.redirect(`/campgrounds/${campground._id}`);
}));


//SHOW ROUTE: details of all campgrounds:
router.get("/:id", isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews").populate("author");
    // console.log(campground);
    if (!campground) {
        req.flash("error", "Campground Not Found!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}));


//GET ROUTE: Updating Campgrounds: creating an Editing form
router.get("/:id/edit", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    //1. Result is there is no campgrounds:
    if (!campground) {
        req.flash("error", "Campground Not Found!");
        return res.redirect("/campgrounds");
    }
    //2. Result if owner of Campground does not match the user id of the request:
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission!")
        return res.redirect(`/campgrounds/${id}`)
    }
    res.render("campgrounds/edit", { campground });
}));


//PUT ROUTE: Updating Campgrounds: submitting the Editing form using methodOverride
router.put("/:id", isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission!")
        return res.redirect(`/campgrounds/${id}`)
    }
    //Title and location grouped in our forms we can use spread operator to find them. new : true => means that we see the updated results
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true }); // it is no longer good enough to find AND update at the same time. this step needs to be broken into 2 steps for protection: first find THEN UPDATE
    req.flash("success", "Campground Successfully Updated!");
    res.redirect(`/campgrounds/${campground._id}`);
}));


//DELETE ROUTE: 
router.delete("/:id", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Campground Successfully Deleted!");
    res.redirect("/campgrounds");
}));


module.exports = router;