const mongoose = require("mongoose");

async function connectMongoDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}

module.exports = { connectMongoDB };
