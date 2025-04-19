const express = require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../utilis/wrapasync.js");
const ExpressError = require("../utilis/expresserror.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validatereview,isloggedIn,isReviewAuthor} = require("../views/middleware.js");
const reviewController = require("../controllers/reviews.js");



//reviews 
// post 
router.post("/",isloggedIn,validatereview,wrapasync(reviewController.createReview));

// delete review route :- 
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapasync(reviewController.destroyReview));

module.exports= router;