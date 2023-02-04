const express = require("express");
const router = express.Router();
const { reviewsSchema } = require("../schemas.js");
const { route } = require("../campgrounds");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/review");

//REVIEWS MIDDLEWARE:
//-----------------------------------------------------------------------------------------------------------------


//REVIEWS ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//POST ROUTE: submitting a review on campground show page
router.post("/campgrounds/:id/reviews", validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));


//DELETE ROUTE: delete a review from an associated campground
router.delete("/campgrounds/:id/reviews/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;