//Installed Dependencies:
//-------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const { campgroundSchema, reviewSchema } = require("./schemas.js");
const Campground = require("./models/campground");
const Review = require("./models/review");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

//Imported Error Handling Utilities:
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { title } = require("process");
const campground = require("./models/campground");

//-------------------------------------------------------------------------------------------------------------------------------------------------
//Importing Mongoose:
mongoose.set('strictQuery', false); // Mongodb warning that returns an error if the collection does not exist
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
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: "testingsecret!",
    resave: false, //as indicated by express-session docs
    saveUninitialized: true, //as indicated by express-session docs
    // store: xyz //In the future it will be a mongo store. Currently we will be using the memory store (only used for dev purposes!)
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7), //Number of milliseconds in 1 week is how long cookie will last
        maxAge: (1000 * 60 * 60 * 24 * 7)
    }

}
app.use(session(sessionConfig));
app.use(flash());

//Flashing messages:
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    req.locals.error = req.flash("error");
    next();
});

//middleware routes:
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

//=================================================================================================================================================

//ROUTES:
//-------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.render("home");
});


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
});