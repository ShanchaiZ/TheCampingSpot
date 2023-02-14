//Installed Dependencies:
const express = require("express");
const router = express.Router({ mergeParams: true });
const { route } = require("./campgrounds");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//Imported Controllers:
const reviews = require("../controllers/reviews");

//Imported Models:
const Campground = require("../models/campground");
const Review = require("../models/review");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");

//REVIEWS MIDDLEWARE: (moved to middleware.js)

//REVIEWS ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//POST ROUTE: submitting a review on campground show page
router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));


//DELETE ROUTE: delete a review from an associated campground
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


module.exports = router;