const express = require('express');
const router = express.Router();
const { signup, login, sendOTP, changePassword } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendOTP);
router.post('/changepassword', changePassword);

router.get('/all-students', (req,res)=>res.status(200).json({message:"not implemented"}));
router.get('/all-instructors', (req,res)=>res.status(200).json({message:"not implemented"}));

module.exports = router;
