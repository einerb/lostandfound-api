"use strict";

import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema(
  {
    path: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photo", PhotoSchema);
