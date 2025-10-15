const Listing = require("../models/listing");
const Review=require("../models/review");

module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  const review = new Review(req.body.review);
  review.author = req.user._id;
  await review.save();
  listing.reviews.push(review._id);
  await listing.save();
  req.flash("success", "New review created!");
  res.redirect(`/listings/${listing._id}`);
};


  module.exports.destroyReview=  async(req,res)=>{
      let{id,reviewId}=req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
      await Review.findByIdAndDelete(reviewId);
      req.flash("success","Review Deleted!");

      res.redirect(`/listings/${id}`);
    };
  