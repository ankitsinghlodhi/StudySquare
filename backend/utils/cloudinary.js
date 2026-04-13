const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.uploadToCloudinary = async (file, folder) => {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

exports.uploadVideoToCloudinary = async (file, folder) => {
  const options = { folder, resource_type: "video" };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
