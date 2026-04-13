const cloudinary = require("cloudinary").v2;

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log("Cloudinary connection FAILED:", error.message);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadResource = async (fileBase64OrPath, folder = 'studynotion') => {
  // fileBase64OrPath can be a base64 data URI or temporary file path
  const result = await cloudinary.uploader.upload(fileBase64OrPath, {
    folder,
    resource_type: 'auto', // supports images/videos
  });
  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
    raw: result,
  };
};

exports.deleteResource = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

module.exports = cloudinaryConnect;
