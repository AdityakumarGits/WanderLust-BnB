const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// POST /listings/:id/reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// router.post("/", (req, res) => {
//   res.send("Review POST route works!");
// });

// DELETE /listings/:id/reviews/:reviewId
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
