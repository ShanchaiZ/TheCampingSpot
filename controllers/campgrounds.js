//Imported Models:
const Campground = require("../models/campground");


//GET Route: Lists/indexes All the Campgrounds Available:
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}


//GET Route: Render A New Campground Form
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
}


//POST Route: Creation of A Campground After Campground Form Submission:
module.exports.createCampground = async (req, res, next) => {
    //If no body.req created and bootstrap form validation is bypassed:
    // if (!req.body.campground) throw new ExpressError("Invalid Data for New Campground Creation", 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id; //same as reviews
    await campground.save();
    req.flash("success", "Campground Successfully Created!"); //flash smg("key" ,"message");
    res.redirect(`/campgrounds/${campground._id}`);
}


//SHOW ROUTE: Details of all campgrounds:
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews", //nested populate
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!campground) {
        req.flash("error", "Campground Not Found!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}