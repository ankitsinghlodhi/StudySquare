const express = require("express");
const router = express.Router();

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

// Create section
router.post("/addSection", createSection);

// Update section
router.put("/updateSection", updateSection);

// Delete section
router.delete("/deleteSection", deleteSection);

module.exports = router;
