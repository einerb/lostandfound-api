"use strict";

import mongoose from "mongoose";

const STATUS = Object.freeze({
  LOST: "lost",
  FOUND: "found",
  NORMAL: "normal",
});

const AccessorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    lost_date: { type: Date },
    place_date: { type: String },
    qr: { type: String, unique: true },
    reward: { type: String },
    category: { type: String, required: true },
    state: {
      type: String,
      enum: Object.values(STATUS),
      required: true,
      default: STATUS.NORMAL,
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  },
  {
    timestamps: true,
  }
);

Object.assign(AccessorySchema.statics, {
  STATUS,
});

module.exports = mongoose.model("Accessory", AccessorySchema);
