const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadVideoToCloudinary } = require("../utils/cloudinary");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;

    if (!sectionId || !title || !req.files?.video) {
      return res.status(400).json({
        success: false,
        message: "sectionId, title and video are required",
      });
    }

    const video = req.files.video;

    // upload video
    const upload = await uploadVideoToCloudinary(video, "course_videos");

    // create subsection document
    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: upload.secure_url,
      timeDuration,
    });

    // push subsection into section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { lectures: newSubSection._id } },
      { new: true }
    ).populate("lectures");

    return res.status(201).json({
      success: true,
      message: "SubSection created successfully",
      updatedSection,
    });
  } catch (err) {
    console.error("createSubSection", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      { title, description, timeDuration },
      { new: true }
    );

    return res.json({
      success: true,
      updatedSubSection,
    });
  } catch (err) {
    console.error("updateSubSection", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "sectionId and subSectionId required",
      });
    }

    // delete subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // pull from section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { lectures: subSectionId },
    });

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (err) {
    console.error("deleteSubSection", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


