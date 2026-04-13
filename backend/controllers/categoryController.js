const Category = require("../models/Category");
const Course = require("../models/Course");

// *******************************
// CREATE CATEGORY
// *******************************
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Category name required" });

    const category = await Category.create({ name, description });

    return res.status(201).json({ success: true, category });
  } catch (err) {
    console.error("createCategory", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// *******************************
// GET ALL CATEGORIES
// *******************************
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).lean();
    return res.json({ success: true, categories });
  } catch (err) {
    console.error("showAllCategories", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// *******************************
// GET CATEGORY PAGE DATA
// *******************************
exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const category = await Category.findById(categoryId).populate("courses");

    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    return res.json({
      success: true,
      category,
      courses: category.courses || [],
    });
  } catch (err) {
    console.error("getCategoryPageDetails", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
