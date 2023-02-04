const express = require("express");
const router = express.Router();
const { campgroundSchema } = require("../schemas.js");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");


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
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});


//POST ROUTE: Where the form will be submitted after submitting the Form Creation
router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    //If no body.req created and bootstrap form validation is bypassed:
    // if (!req.body.campground) throw new ExpressError("Invalid Data for New Campground Creation", 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));


//SHOW ROUTE: details of all campgrounds:
router.get("/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");
    res.render("campgrounds/show", { campground });
}));


//GET ROUTE: Updating Campgrounds: creating an Editing form
router.get("/:id/edit", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
}));


//PUT ROUTE: Updating Campgrounds: submitting the Editing form using methodOverride
router.put("/:id", validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    //Title and location grouped in our forms we can use spread operator to find them. new : true => means that we see the updated results
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    res.redirect(`/campgrounds/${campground._id}`);
}));


//DELETE ROUTE: 
router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}));


module.exports = router;