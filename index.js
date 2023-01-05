const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config({ path: __dirname + "/.env" });

const dbName = process.env.DB_NAME;
const url = process.env.MONGO_URI;

connectDB();

app.get("/properties", async (req, res) => {
  try {
    mongoose.connect(url);

    const connection = mongoose.connection;

    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", async function () {
      const collection = connection.db.collection("media_urls");
      collection.find({}).toArray(function (err, data) {
        if (err) {
          console.log(err);
        }
        res.json({
          result: data,
          message: "success",
        });
        console.log(data); // it will print your collection data
      });
    });
  } catch (error) {
    console.log(error.message);
  }
});



app.listen(5000, () => {
  console.log(`Server connected`);
});
