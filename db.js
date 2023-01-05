const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

mongoose.set('strictQuery', true)

const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://1mwnew:1mwnew@cluster0.gx4k5pc.mongodb.net/?retryWrites=true&w=majority",
      () => {
        console.log("DB connected");
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB
