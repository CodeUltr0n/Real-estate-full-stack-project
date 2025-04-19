const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res)=>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview._id);
    
 
 
    await newReview.save();
 //    listing.reviews.push(newReview._id); // Push ID, not object
    await listing.save();
    req.flash("success","New Review created!")
    res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyReview = async(req,res)=>{  // humesha common part cut kar lena
    let {id , reviewId} = req.params;                   
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review got deleted!")
    res.redirect(`/listings/${id}`)
};

