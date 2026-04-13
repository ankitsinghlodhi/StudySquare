const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { courseId, title } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: { title, subsections: [] } } },
      { new: true }
    );

    res.json({ success: true, updatedCourse });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.updateSection = async (req, res) => {
  const { courseId, sectionId, title } = req.body;

  const course = await Course.findById(courseId);
  const section = course.sections.id(sectionId);
  section.title = title;

  await course.save();

  res.json({ success: true, course });
};

exports.deleteSection = async (req, res) => {
  const { courseId, sectionId } = req.body;

  const course = await Course.findByIdAndUpdate(
    courseId,
    { $pull: { sections: { _id: sectionId } } },
    { new: true }
  );

  res.json({ success: true, course });
};
