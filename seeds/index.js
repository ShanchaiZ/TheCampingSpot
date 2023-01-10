//This file will be independent/self-contained from the node anytime we want to seed the database connect to Mongoose and use the Model to make basic data.
//-------------------------------------------------------------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const cities = require("./cities"); //imported for Location creation = city seed array
const { places, descriptors } = require("./seedHelpers"); //imported and Destructured for Title creation = descriptor + places
const Campground = require("../models/campground");

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

//To pick an element from an array:
const sample = array => array[Math.floor(Math.random() * array.length)];
//Explanation: random number * length of the array, then Math.floor the result. then access that floored number from the array. This will be used to assign a random title to a random location

//LOGIC: Seeding the database with cities and states from the seeds array:
const seedDB = async () => {
    await Campground.deleteMany({});
    //looping the seed data 50 times and random 1000 because there are 1000 seeded cities in the cities seed array.
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            //Location = (random city from the 1000 cities array and .city is the property we want.) + (random State from 1000 cities array and the random State property)
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            //Title of the location: from seedHelpers array  --> random sample descriptor 
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();
    }
}
seedDB();
//----------------------------------------------------------------------------------------------------------------------------------------------