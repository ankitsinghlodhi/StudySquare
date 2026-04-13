require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const fileUpload = require("express-fileupload");

const cloudinaryConnect = require("./config/cloudinary");

const app = express();
const PORT = process.env.PORT || 5000;

// File upload middleware
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

app.use(cors());
app.use(express.json());

// 🔥 Connect Database FIRST
connectDB()
  .then(() => {
    console.log("Database connected successfully");

    // 🔥 THEN connect Cloudinary
    cloudinaryConnect();
  })
  .catch(err => console.log(err));


// -------------------- ROUTES --------------------

// Authentication
app.use('/auth', require('./routes/user'));

// Profile
app.use('/profile', require('./routes/profile'));

// Payments
app.use('/payment', require('./routes/payments'));

// Contact Us
app.use('/reach', require('./routes/reach'));

// Courses
app.use('/course', require('./routes/course'));

// Categories
app.use('/category', require('./routes/category'));

// Ratings
app.use('/rating', require('./routes/rating'));

// Sections & Subsections
app.use('/section', require('./routes/section'));
app.use('/subSection', require('./routes/subSection'));

// Health Check
app.get('/', (req, res) => res.send({ ok: true }));

// Server Start
app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
