const mongoose = require("mongoose");
const Schema = mongoose.Schema; //shortcut for referencing Mongoose.Schema for relationships

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type:Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Review" , reviewSchema);