const mongoose = require('mongoose')

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit with failure code, process.exit is used for graceful termination on failure
  }
  
}

module.exports = connectDB