const express = require('express');
const router = express.Router();
const ProfileCtrl = require('../controllers/profileController');

const {
  becomeInstructor,
  instructorDashboard,
  enrollCourse,
  getEnrolledCourses,
} = require("../controllers/profileController");

router.post("/becomeInstructor", becomeInstructor);
router.get("/instructorDashboard", instructorDashboard);
router.post("/enrollCourse", enrollCourse);
router.get("/getEnrolledCourses", getEnrolledCourses);
router.post("/enrollCourse", enrollCourse);

router.get('/getUserDetails', ProfileCtrl.getUserDetails);
router.post('/updateUserProfileImage', (req,res)=>res.json({ok:true}));

module.exports = router;
