//Installed Dependencies:
const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//Imported Controllers:
const campgrounds = require("../controllers/campgrounds");

//Imported Models:
const Campground = require("../models/campground");

//Imported Error Handling Utilities:
const catchAsync = require("../utils/catchAsync");

//CAMPGROUND MIDDLEWARE:(moved to middleware.js)
//CAMPGROUND ROUTES: 
//-----------------------------------------------------------------------------------------------------------------

// Routes are prefixed by PORT/campgrounds...
router.route("/")
    //INDEX ROUTE: lists all the campgrounds available:
    .get(catchAsync(campgrounds.index))

    //POST ROUTE: Where the form will be submitted after submitting the Form Creation
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send("Multer MULTI image uploading works!!!");
    })

//GET ROUTE: Form Creation
router.get("/new", isLoggedIn, campgrounds.renderNewForm);


router.route("/:id")
    //SHOW ROUTE: All Details of A campgrounds:
    .get(isLoggedIn, catchAsync(campgrounds.showCampground))

    //PUT ROUTE: Updating Campgrounds After Submitting Editing form:
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

    //DELETE ROUTE: 
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


//GET ROUTE: Updating Campgrounds: creating an Editing form
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCampground));


module.exports = router;