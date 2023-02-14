//Imported Models:
const Campground = require("../models/campground");
const Review = require("../models/review");


//POST ROUTE: submitting a review on campground show page
module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id; //same as campgrounds  
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Review Successfully Created!");
    res.redirect(`/campgrounds/${campground._id}`);
}


//DELETE ROUTE: delete a review from an associated campground
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Successfully Deleted!");
    res.redirect(`/campgrounds/${id}`);
}