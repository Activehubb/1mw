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
      const numberOfResults = Number(req.query.limit) || 100;
      const result = await collection.find({}).limit(numberOfResults).toArray();
      res.json({
        data: result,
        message: "success",
      });
    });

    app.listen(5000, () => console.log("listening on port 5000"));
  } catch (error) {}
}

main();
