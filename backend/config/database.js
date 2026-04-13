const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting server with Database');
    console.error(error);
    process.exit(1);
  }
};
