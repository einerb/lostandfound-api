"use strict";

require("rootpath")();
require("dotenv").config(); //instatiate environment variables

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import errorHandler from "./utils/error-handler";
import logger from "./utils/logger";
import loadData from "./seeds/initial.data";
import jwt from "./middlewares/jwt";

// Create server express
const app = express();

// Use CORS
app.use(cors());

// Body Parse
app.use(bodyParser.urlencoded({ extended: false }, { limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// Middlewares
app.use(jwt());

// global error handler
app.use(errorHandler);

// Connection to MongoDB
mongoose.connect(process.env.URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", (err) => logger.error("👉 Cannot connect to the database", err));
db.once("open", async () => {
  await loadData();
  logger.info(`🚀 Database running on ${process.env.URI_DB}`);
});

// routes
app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO FOUND & LOST API v. 0.0.1" });
});
require("./routes")(app);

// static files
app.use(express.static(path.join(__dirname, "public")));

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;

// Start server
app.listen(port, () => {
  logger.info(`👉 Server ready at http://localhost:${port}`);
});
