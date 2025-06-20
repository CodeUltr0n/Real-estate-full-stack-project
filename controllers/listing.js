const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res,next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req, res,next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner"); // ✅ Use correct variable name
    if (!listing) {
       req.flash("error","Listing you are requesting doesn't exits!");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};


module.exports.createListing = async (req,res,next)=>{
    
    let response =  await geocodingClient
        .forwardGeocode({
           query: req.body.listing.location,
           limit: 1,
      })
        .send();
  
   
    

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    console.log(newListing);

    newListing.owner = req.user._id;
    newListing.image = {url,filename};


    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing =  await newListing.save();
    console.log(savedListing);

    req.flash("success","New listing created!")
    res.redirect("/listings");
};

module.exports.renderEditform = async (req,res,next)=>{
    let { id } = req.params;
    const listing  = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing you are requesting doesn't exits!");
        res.redirect("/listings");
     }

     let originalImageUrl = listing.image.url;
     originalImageUrl = originalImageUrl.replace("/uploads", "/uploads/w_250,q_40");
    res.render("listings/edit.ejs",{listing,originalImageUrl})
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const updatedData = { ...req.body.listing };

    if (req.body.listing.image) {
        updatedData.image = {
            url: req.body.listing.image.url || "",  // Default empty if missing
            filename: req.body.listing.image.filename || "default-filename.jpg"
        };
    }
    let listing =  await Listing.findByIdAndUpdate(id, updatedData);


    if ( typeof req.file !== "undefined") {
          let url = req.file.path;
          let filename = req.file.filename;
          listing.image = {url,filename};
          await listing.save();
    }

    req.flash("success","Listing got updated!")
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res,next) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing got deleted!");
    res.redirect("/listings");
};

