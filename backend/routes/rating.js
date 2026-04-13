const express = require("express");
const router = express.Router();

const {
  createRating,
  getReviews,
} = require("../controllers/courseController");

// Create review
router.post("/createRating", createRating);

// Get course reviews
router.get("/getReviews", getReviews);

module.exports = router;
