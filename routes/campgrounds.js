//Installed Dependencies:
const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

//Impoted Controllers:
const campgrounds = require("../controllers/campgrounds");

//Imported Models:
const Campground = require("../models/campground");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");

//CAMPGROUND MIDDLEWARE:(moved to middleware.js)
//CAMPGROUND ROUTES:
//-----------------------------------------------------------------------------------------------------------------
//INDEX ROUTE: lists all the campgrounds available:
router.get("/", catchAsync(campgrounds.index));


//GET ROUTE: Form Creation
router.get("/new", isLoggedIn, campgrounds.renderNewForm);


//POST ROUTE: Where the form will be submitted after submitting the Form Creation
router.post("/", isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));


//SHOW ROUTE: details of all campgrounds:
router.get("/:id", isLoggedIn, catchAsync(campgrounds.showCampground));


//GET ROUTE: Updating Campgrounds: creating an Editing form
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCampground));


//PUT ROUTE: Updating Campgrounds After Submitting Editing form:
router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));


//DELETE ROUTE: 
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;