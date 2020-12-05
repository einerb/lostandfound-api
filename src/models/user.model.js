"use strict";

import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    occupation: { type: String },
    city: { type: String, required: true },
    address: { type: String },
    birthdate: { type: Date, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    state: { type: Boolean, required: true, default: true },
    photo: { type: String },
    role: { type: Boolean, defualt: false },
    emailVisible: { type: Boolean, default: false },
    occupationVisible: { type: Boolean, default: false },
    phoneVisible: { type: Boolean, default: false },
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("User", UserSchema);
