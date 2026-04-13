const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  time: Number,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  subsections: [subsectionSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String,
    price: Number,
    thumbnail: String,
    studentsEnrolled: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

    sections: [sectionSchema],
    ratingAndReviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Rating" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
