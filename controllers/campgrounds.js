//Imported Models and Dependencies:
const Campground = require("../models/campground");

const { cloudinary } = require("../cloudinary");

//MapBox:
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding"); //the Geocoding services this app will use from the package
const mapBoxToken = process.env.MAPBOX_TOKEN;  //token to access mapbox app
const geocoder = mbxGeocoding({ accessToken: mapBoxToken }); //Accesstoken is used here when initialize/instantiate a new mapbox Geocoding instance + also contains 2 modes (forward and reverse geocoding methods)

//---------------------------------------------------------------------------------------------------------------------------------------------
//GET Route: Lists/indexes All the Campgrounds Available
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}


//GET Route: Render A New Campground Form
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
}


//POST Route: Creation of A Campground After Campground Form Submission
module.exports.createCampground = async (req, res, next) => {
    //Using Geocoder Client:
    const geoData = await geocoder.forwardGeocode({
        query: "New York City, New York",
        limit: 1
    }).send();
    res.send(geoData.body.features[0].geometry.coordinates);

    //If no body.req created and bootstrap form validation is bypassed:
    // if (!req.body.campground) throw new ExpressError("Invalid Data for New Campground Creation", 400);

    // const campground = new Campground(req.body.campground);
    // campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // campground.author = req.user._id; //same as reviews
    // await campground.save();
    // console.log(campground);
    // req.flash("success", "Campground Successfully Created!"); //flash smg("key" ,"message");
    // res.redirect(`/campgrounds/${campground._id}`);
}


//SHOW route: All Details of A campground:
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

//GET route: Render An Edit Form for Updating campgrounds
module.exports.renderEditCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    //1. Result is there is no campgrounds:
    if (!campground) {
        req.flash("error", "Campground Not Found!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
}


//PUT route: Updating Campgrounds After Submitting Editing form
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    //Title and location grouped in our forms we can use spread operator to find them. new : true => means that we see the updated results
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true }); // it is no longer good enough to find AND update at the same time. this step needs to be broken into 2 steps for protection: first find THEN UPDATE
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...imgs);
    await campground.save();

    //Delete Images if there are images TO delete:
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        console.log(campground);
    }
    req.flash("success", "Campground Successfully Updated!");
    res.redirect(`/campgrounds/${campground._id}`);
}


//DELETE route: Delete/Destroy A Campground
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Campground Successfully Deleted!");
    res.redirect("/campgrounds");
}
