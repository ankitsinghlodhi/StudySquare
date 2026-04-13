const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  timeDuration: {
    type: String, // store as "10:35" or seconds
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
