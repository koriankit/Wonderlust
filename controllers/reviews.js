// const Listing = require("../models/listing");
// const Review = require("../models/review");


// module.exports.createReview =  async (req, res) => {
//    // console.log(req.params.id);
//    let listing = await Listing.findById(req.params.id);
//    let newReview = new Review(req.body.review);
//    newReview.author = req.user._id;
//    // console.log(newReview);
//    listing.reviews.push(newReview);
//    await newReview.save();
//    await listing.save();
//    req. flash("success", "New Review Created!");
//    res.redirect(`/listings/${listing._id}`);
//  };

 
//  module.exports.destroyReview =  async (req, res) => {
//      let { id, reviewId } = req.params;
//      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//      await Review.findByIdAndDelete(reviewId);
//      req.flash("success", "Review Deleted!");
//      res.redirect(`/listings/${id}`);
//    };



const express = require("express");
const router = express.Router({ mergeParams: true }); // Needed to access :id from parent route

const reviewController = require("../controllers/review.js"); // ✅ Make sure this file exists
const { isLoggedIn, validateReview } = require("../middleware.js");

// ✅ Route to create a new review (POST /listings/:id/reviews)
router.post("/", isLoggedIn, validateReview, reviewController.createReview);

// ✅ Route to delete a review (DELETE /listings/:id/reviews/:reviewId)
router.delete("/:reviewId", isLoggedIn, reviewController.destroyReview);

module.exports = router;
