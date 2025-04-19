const express = require("express");
const router = express.Router();
const wrapasync = require("../utilis/wrapasync.js");
const ExpressError = require("../utilis/expresserror.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner ,validateListing} = require("../views/middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});


router
.route("/")  /// index
.get(wrapasync(listingController.index))  //index-route
.post(isloggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapasync(
        listingController.createListing)); // create route


//new route :- 
router.get("/new",isloggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapasync(listingController.showListing)) //show route
.put(isOwner,isloggedIn,upload.single("listing[image]"), validateListing, wrapasync(listingController.updateListing)) // update route
.delete(isOwner,isloggedIn, wrapasync(listingController.deleteListing)); // delete route 

// edit route : -
router.get("/:id/Edit",isOwner, isloggedIn,wrapasync(listingController.renderEditform));

module.exports = router;