const Joi = require('joi');  // server side validation 
const review = require('./models/review');

// listing model :-
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location: Joi.string().required(),
        country:Joi.string().required(),
        price : Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().uri().default("/images/default.jpg"),
            filename: Joi.string().allow("").default(""),
        }).default({ url: "/images/default.jpg", filename: "" })
    }).required()
});

// review model:-
module.exports.reviewSchema = Joi.object({
    review:Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),
    }).required()
});