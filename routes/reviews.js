//Installed Dependencies:
const express = require("express");
const router = express.Router({ mergeParams: true });
const { route } = require("./campgrounds");

//Imported Models:
const { reviewSchema } = require("../schemas.js");
const Campground = require("../models/campground");
const Review = require("../models/review");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

//REVIEWS MIDDLEWARE:
//-----------------------------------------------------------------------------------------------------------------

//Serverside Validation Function for Reviews:
const validateReview = (req, res, next) => {
    //if Error in Schema Validation which results in error in:
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(element => element.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

//REVIEWS ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//POST ROUTE: submitting a review on campground show page
router.post("/", validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success" ,"Review Successfully Created!");
    res.redirect(`/campgrounds/${campground._id}`);
}));


//DELETE ROUTE: delete a review from an associated campground
router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" ,"Review Successfully Deleted!");
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;