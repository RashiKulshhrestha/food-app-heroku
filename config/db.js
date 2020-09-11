const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);

    process.exit(1); //Exit Process with failure
  }
};

module.exports = connectMongoDB;