const express = require("express");
const router = express.Router();

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSectionController");

// Create subsection
router.post("/addSubSection", createSubSection);

// Update subsection
router.put("/updateSubSection", updateSubSection);

// Delete subsection
router.delete("/deleteSubSection", deleteSubSection);

module.exports = router;
