
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const OTP = require("../models/OTP");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("[sendOTP] User exists:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Remove any older OTPs
    await OTP.deleteMany({ email });

    const created = await OTP.create({ email, otp });
    console.log("[sendOTP] OTP saved:", otp);

    console.log("Generated OTP:", otp);

    // Send email
    const html = `<p>Your OTP for StudyNotion is: <strong>${otp}</strong></p>`;
    await mailSender(email, "StudyNotion OTP", html);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    console.error("[sendOTP] error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email, password and OTP are required",
      });
    }

    console.log("Entered OTP:", otp);


    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Find latest OTP
    const recent = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recent) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    console.log("DB OTP:", recent.otp);

    if (String(recent.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP correct → delete OTPs
    await OTP.deleteMany({ email });

    // Create account
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
  firstName,
  lastName,
  email,
  password: hashed,
});
    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (err) {
    console.error("[signup] error:", err);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email })
      .populate("additionalDetails")
      .populate("enrolledCourses");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
        additionalDetails: user.additionalDetails,
        image: user.image,
      },
    });
  } catch (err) {
    console.error("[login] error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};



exports.changePassword = async (req, res) => {
  // protected route - but for now no auth middleware; just accept
  const { email, newPassword } = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({msg:"User not found"});
  user.password = await bcrypt.hash(newPassword,10);
  await user.save();
  return res.json({success:true});
};
