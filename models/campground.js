const mongoose = require("mongoose");
const Schema = mongoose.Schema; //shortcut for referencing Mongoose.Schema for relationships
const Review = require("./review");

//Image Schema to make thumbnails:
const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
})


//Campground Schema:
const opts = { toJSON: { virtuals: true } }; // From mongoose Virtual Json docs to display virtuals
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    // for GeoJson location
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);


//Nested Mongoose Virtual for making Campground Popups on Map:
CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return "THIS IS A POP UP TEXT!!"
})

//Mongoose Deletion Post Middleware: deletes reviews that are associated with the campground
CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});


module.exports = mongoose.model("Campground", CampgroundSchema);