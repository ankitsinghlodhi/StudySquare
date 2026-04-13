// backend/routes/course.js
const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseDetails,
  createCourse,
  getReviews,
   getInstructorCourses,
   updateCourseProgress,
  createRating
} = require('../controllers/courseController');
const {
  getEnrolledCourses,
} = require('../controllers/profileController');



const courseController = require('../controllers/courseController');

const { protect, restrictTo } = require('../middleware/auth');



// Create course (multipart/form-data) - admin/instructor
//router.post('/createCourse', createCourse);
router.post('/createCourse', protect, restrictTo('instructor', 'admin'), courseController.createCourse);


// Get all courses (catalog)
router.get('/getAllCourses', getAllCourses);

// Single course details (query ?id=)
router.get('/getCourseDetails', getCourseDetails);

// Reviews
router.get('/getReviews', getReviews);
router.post('/createRating', createRating);


router.get("/getInstructorCourses", getInstructorCourses);

router.post("/updateCourseProgress", updateCourseProgress);
router.get("/getEnrolledCourses", getEnrolledCourses);


module.exports = router;
