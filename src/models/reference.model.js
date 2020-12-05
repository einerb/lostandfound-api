"use strict";

import mongoose from "mongoose";

const ReferenceSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accessory: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory" },
    details: { type: String, required: true },
    state: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reference", ReferenceSchema);
