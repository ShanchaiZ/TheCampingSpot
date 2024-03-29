if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//Installed Dependencies:
//-------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const { campgroundSchema, reviewSchema } = require("./schemas.js");//
const Campground = require("./models/campground");//
const Review = require("./models/review");//
const User = require("./models/user");


const userRoutes = require("./routes/users");
const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");


// Mongo Connection:
const MongoStore = require("connect-mongo");

//Securities:
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");


//Imported Error Handling Utilities:
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { title } = require("process");
const campground = require("./models/campground");

//-------------------------------------------------------------------------------------------------------------------------------------------------

//To Connect to MongoDB Atlas replace the localhost in dbURL with "process.env.DB_URL";
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/TheCampingSpot";

//Importing Mongoose:
mongoose.set('strictQuery', false); // Mongodb warning that returns an error if the collection does not exist
mongoose.connect(dbUrl, {
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
app.use(mongoSanitize());//Sanitizes the requests of prohibitive characters in req.body, req.params, req.query


//Changed Session Storage from local memory to MongoDB:
const secret = process.env.SECRET || "testingsecret";

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR!!", e)
})

const sessionConfig = {
    store,
    name: "campingSession", //Name of the cookie over defaulted name
    secret,
    resave: false, //as indicated by express-session docs
    saveUninitialized: true, //as indicated by express-session docs
    // store: xyz //In the future it will be a mongo store. Currently we will be using the memory store (only used for dev purposes!)
    cookie: {
        httpOnly: true,
        // secure: true, //cookies can only be accessed and configured over secured connections
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7), //Number of milliseconds in 1 week is how long cookie will last
        maxAge: (1000 * 60 * 60 * 24 * 7)
    }
}

app.use(session(sessionConfig));
app.use(flash());


//Helmet Configuration:
//-----------------------------------------------------------------------------------------------------------------------------------------------
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/bigcloudinthesky/" //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/bigcloudinthesky/" //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
];
const connectSrcUrls = [
    "https://*.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://events.mapbox.com",
    "https://res.cloudinary.com/bigcloudinthesky/"
];
const fontSrcUrls = ["https://res.cloudinary.com/bigcloudinthesky/"]; //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/bigcloudinthesky/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                "https://images.unsplash.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            mediaSrc: ["https://res.cloudinary.com/bigcloudinthesky/"], //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
            childSrc: ["blob:"]
        }
    })
);

//-----------------------------------------------------------------------------------------------------------------------------------------------

//Passport Configuration:
app.use(passport.initialize());
app.use(passport.session()); //needed for persistent login sessions and passport.session NEEDS to be after session().
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());//explain: tells passport how to serialize a user. Serialize a user refers to "how do we store a user in a session?" and "how do we get a user out of that session?"


//Flashing Messages:
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//Middleware routes:
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);
app.use("/", userRoutes);

//=================================================================================================================================================

//ROUTES:
//-------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.render("home");
});


//testing: GET ROUTE: Registering A New User: 
app.get("/fakeUser", async (req, res) => {
    const user = new User({ email: "JohnDoe@gmail.com", username: "John" })
    const newUser = await User.register(user, "123"); // User.Register takes the entire user model the instance then a password. then hashes it.
    res.send(newUser);
})
//Testing Verified: this route and the method User.register does output an email, a username, a salt and hash field!


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
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
});