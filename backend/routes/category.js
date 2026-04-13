const express = require("express");
const router = express.Router();

const {
  createCategory,
  showAllCategories,
  getCategoryPageDetails,
} = require("../controllers/categoryController");

// Create category
router.post("/createCategory", createCategory);

// List all categories
router.get("/showAllCategories", showAllCategories);

// Category page data
router.post("/getCategoryPageDetails", getCategoryPageDetails);

module.exports = router;
