const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require("../models/CourseProgress");

// INSTRUCTOR DASHBOARD
exports.instructorDashboard = async (req, res) => {
  try {
    const { instructorId } = req.query;

    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "Instructor ID is required",
      });
    }

    const courses = await Course.find({ instructor: instructorId });

    const coursesCount = courses.length;

    let studentsCount = 0;

    courses.forEach((course) => {
      if (course.studentsEnrolled) {
        studentsCount += course.studentsEnrolled.length;
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        coursesCount,
        studentsCount,
        totalEarnings: 0, // placeholder (payment comes later)
      },
    });
  } catch (error) {
    console.error("instructorDashboard error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.getUserDetails = async (req,res) => {
  // expect query: ?email=...
  const { email } = req.query;
  const user = await User.findOne({email}).lean();
  if(!user) return res.status(404).json({msg:"Not found"});
  return res.json({user});
};


// MOCK ENROLL COURSE
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Course ID required",
      });
    }

    // add course to user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

    // add user to course
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { studentsEnrolled: userId },
    });

    // create progress document
    await CourseProgress.create({
      userId,
      courseId,
      completedVideos: [],
    });

    return res.status(200).json({
      success: true,
      message: "User enrolled successfully",
    });
  } catch (error) {
    console.error("enrollCourse error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ENROLLED COURSES
exports.getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required",
      });
    }

    const user = await User.findById(userId)
      .populate({
        path: "enrolledCourses",
        populate: {
          path: "sections",
          populate: {
            path: "lectures",
          },
        },
      });

    return res.status(200).json({
      success: true,
      enrolledCourses: user.enrolledCourses,
    });
  } catch (error) {
    console.error("getEnrolledCourses error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



exports.becomeInstructor = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "instructor") {
      return res.status(400).json({
        success: false,
        message: "User is already an instructor",
      });
    }

    user.role = "instructor";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "You are now an instructor. Please login again.",
    });
  } catch (error) {
    console.error("becomeInstructor error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};