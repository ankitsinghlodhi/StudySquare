// backend/controllers/courseController.js
const Course = require('../models/Course');
const Rating = require('../models/Rating');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary'); // adjust path if you have different file
const CourseProgress = require("../models/CourseProgress");
// Create course
exports.createCourse = async (req, res) => {
  try {
    // body fields expected: title, description, category, price, instructor (optional)
    // file expected: thumbnail (multipart/form-data)
    const { title, description, category, price, instructor } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "title & description required" });
    }

    // handle thumbnail upload if present
    let thumbnailUrl = null;
    if (req.files && req.files.thumbnail) {
      const file = req.files.thumbnail;
      const upload = await cloudinary.uploader.upload(file.tempFilePath || file.path, {
        folder: "study-notion/courses",
        use_filename: true
      });
      thumbnailUrl = upload.secure_url;
    }

    const payload = {
      title,
      description,
      category: category || "",
      price: price ? Number(price) : 0,
      instructor: instructor || null,
      thumbnail: thumbnailUrl ? thumbnailUrl : undefined
    };

    const course = await Course.create(payload);
    return res.status(201).json({ success: true, course });
  } catch (err) {
    console.error("createCourse error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).limit(50).populate('instructor', 'name email').lean();
    return res.json({ success: true, courses });
  } catch (err) {
    console.error("getAllCourses:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single course
exports.getCourseDetails = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    const course = await Course.findById(id).populate('instructor', 'name email').lean();
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    return res.json({ success: true, course });
  } catch (err) {
    console.error("getCourseDetails:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get reviews for a course
exports.getReviews = async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId) return res.status(400).json({ success: false, message: "courseId required" });

    const reviews = await Rating.find({ course: courseId }).populate('user', 'name').lean();
    return res.json({ success: true, reviews });
  } catch (err) {
    console.error("getReviews:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create rating/review
exports.createRating = async (req, res) => {
  try {
    const { user, course, rating, review } = req.body;
    if (!user || !course || !rating) {
      return res.status(400).json({ success: false, message: "user, course and rating are required" });
    }

    const newRating = await Rating.create({ user, course, rating, review });
    // update course rating summary (optional simple approach)
    const ratings = await Rating.find({ course }).lean();
    const avg = ratings.reduce((s, r) => s + (r.rating || 0), 0) / (ratings.length || 1);

    await Course.findByIdAndUpdate(course, { rating: avg.toFixed(2), totalRatings: ratings.length });

    return res.json({ success: true, review: newRating });
  } catch (err) {
    console.error("createRating:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getInstructorCourses = async (req, res) => {
  try {
    const { instructorId } = req.query;

    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "Instructor ID is required",
      });
    }

    const courses = await Course.find({
      instructor: instructorId,
    }).populate("sections");

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("getInstructorCourses error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.updateCourseProgress = async (req, res) => {
  try {
    const { userId, courseId, subSectionId } = req.body;

    if (!userId || !courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const progress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found",
      });
    }

    if (!progress.completedVideos.includes(subSectionId)) {
      progress.completedVideos.push(subSectionId);
      await progress.save();
    }

    return res.status(200).json({
      success: true,
      completedVideos: progress.completedVideos,
    });
  } catch (error) {
    console.error("updateCourseProgress error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};