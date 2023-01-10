//This file will be independent/self-contained from the node anytime we want to seed the database connect to Mongoose and use the Model to make basic data.
//-------------------------------------------------------------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const Campground = require("./models/campground");
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
