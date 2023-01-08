const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const url = process.env.MONGO_URI;
async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db();
    const collection = db.collection("media_urls");

    app.get("/properties", async (req, res) => {
      const resultPerPage = Number(req.query.limit) || 20;

      const currentPage = Number(req.query.page) || 1;

      const skip = resultPerPage * (currentPage - 1);

      const response = await collection
        .find({})
        .limit(resultPerPage)
        .skip(skip)
        .toArray();

      const responseCounts = await collection.countDocuments();
      res.json({
        resultPerPage: resultPerPage,
        counts: responseCounts,
        data: response,
        message: "success",
      });
    });

    app.listen(5000, () => console.log("listening on port 5000"));
  } catch (error) {
    console.log(error.message);
  }
}

main();
