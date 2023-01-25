//Installed Dependencies:
//-------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate")
const methodOverride = require("method-override");
const Campground = require("./models/campground");

//Imported Error Handling Utilities:
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

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

//Routes:
//-------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.render("home");
});


//Index Route: lists all the campgrounds available:
app.get("/campgrounds", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}));

//Get Route: Form Creation
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

//Post Route: Where the form will be submitted after submitting the Form Creation
app.post("/campgrounds", catchAsync(async (req, res, next) => {
    //If no body.req created and bootstrap form validation is bypassed:
    if (!req.body.campground) throw new ExpressError("Invalid Data for New Campground Creation", 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));


//Show Route: details of all campgrounds:
app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
}));


//GET ROUTE: Updating Campgrounds: creating an Editing form
app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
}));


//PUT ROUTE: Updating Campgrounds: submitting the Editing form using methodOverride
app.put("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    //Title and location grouped in our forms we can use spread operator to find them. new : true => means that we see the updated results
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    res.redirect(`/campgrounds/${campground._id}`);
}));

//DELETE ROUTE: 
app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
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