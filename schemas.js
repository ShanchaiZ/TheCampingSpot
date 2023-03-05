//ALL SCHEMAS:
//------------------------------------------------------------------------
//SERVERSIDE VALIDATOR SCHEMA FOR CAMPGROUNDS:
//note: not the same as Mongoose Model Schemas!

const { number } = require("joi");
const sanitizeHTML = require("sanitize-html"); //required from sanitizeHTML docs 
const BaseJoi = require("joi");


//Custom Joi Extension from their docs to create a sanitizeHTML function
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [], //NO allowed values in html
                    allowedAttributes: {}, //NO allowed attributes in html
                });
                if (clean !== value) return helpers.error("string.escapeHTML", { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

//JOI SCHEMA VALIDATOR MODEL:
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
}).required();


//SERVERSIDE VALIDATOR SCHEMA FOR REVIEWS:
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})