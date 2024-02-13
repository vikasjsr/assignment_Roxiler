// server.mjs
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import {
  fetchAndStoreData,
  getAllData,
  getBarChartData,
} from "./controller/productController.js";

const app = express();
const port = process.env.PORT || 4000;

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.use(express.json());

mongoose
  .connect(process.env.mongoURI, { useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/fetch-and-store-data", fetchAndStoreData);

app.get("/getall/:id", getAllData);

app.get("/bargraph/:id", getBarChartData);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
