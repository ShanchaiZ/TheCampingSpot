//Installed Dependencies:
const express = require("express");
const router = express.Router({ mergeParams: true });
const { route } = require("./campgrounds");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware")

//Imported Models:
const Campground = require("../models/campground");
const Review = require("../models/review");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");

//REVIEWS MIDDLEWARE: (moved to middleware.js)
//REVIEWS ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//POST ROUTE: submitting a review on campground show page
router.post("/", validateReview, isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id; //same as campgrounds  
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Review Successfully Created!");
    res.redirect(`/campgrounds/${campground._id}`);
}));


//DELETE ROUTE: delete a review from an associated campground
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Successfully Deleted!");
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;