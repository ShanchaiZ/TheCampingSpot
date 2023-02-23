//ALL SCHEMAS:
//------------------------------------------------------------------------
//SERVERSIDE VALIDATOR SCHEMA FOR CAMPGROUNDS:
//note: not the same as Mongoose Model Schemas!

const { number } = require("joi");
const Joi = require("joi");
//JOI SCHEMA VALIDATOR MODEL:
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
}).required();



//SERVERSIDE VALIDATOR SCHEMA FOR REVIEWS:
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})