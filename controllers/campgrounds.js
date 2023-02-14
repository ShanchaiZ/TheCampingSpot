//Imported Models:
const Campground = require("../models/campground");


//Get Route Controller: Lists/indexes All the Campgrounds Available:
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}


//Get Route: Create A New Campground Form
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
}