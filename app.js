//Installed Dependencies:
//-------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const Campground = require("./models/campground");
const Review = require("./models/review");

const campgrounds = require("./routes/campgrounds");

//Imported Error Handling Utilities:
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { title } = require("process");
const campground = require("./models/campground");

//-------------------------------------------------------------------------------------------------------------------------------------------------
//Importing Mongoose:
mongoose.connect("mongodb://127.0.0.1:27017/TheCampingSpot", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    //Process of Connecting mongodb server to mongoose: 
    //"localhost" was replaced with "127.0.0.1" and /TheCampingSpot is the name of our new created database.
    .then(() => {
        console.log("MongoDB Connection is Open!");
    })
    .catch(err => {
        console.log("There is Mongo Connection Error!");
        console.log(err);
    });
//-------------------------------------------------------------------------------------------------------------------------------------------------
const app = express();


//Middlewares:
//-------------------------------------------------------------------------------------------------------------------------------------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); //req.body parser!
app.use(methodOverride("_method"));//Allows submission forms to PUT/PATCH/DELETE in addition to GET/POST!


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

//middleware routes:
app.use("/campgrounds" , campgrounds);

//=================================================================================================================================================


//ROUTES:
//-------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.render("home");
});


//REVIEWS:
//POST ROUTE: submitting a review on campground show page
app.post("/campgrounds/:id/reviews", validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));


//DELETE ROUTE: delete a review from an associated campground
app.delete("/campgrounds/:id/reviews/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));


//Basic 404 Route: For all unrecognizable requests:
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found!", 404));
});

// //testing: Creation of a new campground using a route:
// app.get("/makecampground", async (req, res) => {
//     const camp = new Campground({ title: "My Backyard", description: "Starter Camping Experience!" });
//     await camp.save();
//     res.send(camp);
// })



//=================================================================================================================================================

//Basic Error Handler:
//-------------------------------------------------------------------------------------------------------------------------------------------------
app.use((err, req, res, next) => {
    const { statusCode = 500, } = err;
    if (!err.message) err.message = "An Error has Occured!!";
    res.status(statusCode).render("error", { err });
});


// APP IS LISTENING ON PORT:
//=============================================================================================
app.listen(3001, () => {
    console.log("APP IS LISTENING ON PORT 3001!")
})