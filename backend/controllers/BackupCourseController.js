// CONTROLLER: courseController.js
// ----------------------------------

const Course = require("../models/Course");
const Category = require("../models/Category");
const Rating = require("../models/Rating");
const { uploadToCloudinary } = require("../utils/cloudinary");


// GET all courses

exports.getAllCourses = async (req, res) => {
  const courses = await Course.find().select("title price thumbnail rating");
  return res.json({ courses });
};

// GET single course details


exports.getCourseDetails = async (req, res) => {
  const { id } = req.body;

  const course = await Course.findById(id)
    .populate("instructor", "name email")
    .populate("ratingAndReviews")
    .lean();

  if (!course) return res.status(404).json({ message: "Course not found" });

  return res.json({ course });
};



// GET reviews for a course

exports.getReviews = async (req, res) => {
  try {
    const { courseId } = req.query;

    const reviews = await Rating.find({ course: courseId }).populate("user", "name");

    return res.json({ success: true, reviews });
  } catch (err) {
    console.error("getReviews", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET all categories
exports.showAllCategories = async (req, res) => {
  try {
    const cats = await Category.find({}).lean();
    return res.json({ categories: cats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};


// GET category page listing
exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { category } = req.body;

    const courses = await Course.find({ category }).limit(20).lean();

    return res.json({
      category,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};


// CREATE course

exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const instructorId = req.body.instructor; // from token frontend

    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({ success: false, message: "Thumbnail required" });
    }
    const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail, "course_thumbnails");

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: instructorId,
      thumbnail: thumbnailUpload.secure_url,
    });

    await User.findByIdAndUpdate(instructorId, {
      $push: { courses: course._id },
    });

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// CREATE rating/review

exports.createRating = async (req, res) => {
  try {
    const { userId, courseId, rating, review } = req.body;

    const newRating = await Rating.create({ user: userId, course: courseId, rating, review });

    await Course.findByIdAndUpdate(courseId, {
      $push: { ratingAndReviews: newRating._id }
    });

    return res.json({ success: true, newRating });
  } catch (err) {
    console.error("createRating", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};