"use strict";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

exports.auth = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password").exec();

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_ENCRYPTION);
    return {
      token,
    };
  }
};

exports.getAll = async () => {
  return await User.find({ role: { $ne: true } })
    .populate("accessories")
    .exec();
};

exports.getById = async (id) => {
  return await User.findById(id)
    .populate({
      path: "accessories",
      options: { sort: { updatedAt: -1 } },
      populate: { path: "photos" },
    })
    .exec();
};

exports.create = async (userParam) => {
  if (await User.findOne({ email: userParam.email })) {
    throw "Email already exists!";
  }
  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
};

exports.update = async (id, userParam) => {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.name !== userParam.name &&
    (await User.findOne({ name: userParam.name }))
  ) {
    throw 'Name "' + userParam.name + '" is already taken';
  }

  await Object.assign(user, userParam);

  await user.save();
};

exports.updateVisibilityPhone = async (id, phoneVisible) => {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";

  await Object.assign(user, phoneVisible);

  await user.save();
};

exports.updateVisibilityEmail = async (id, emailVisible) => {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";

  await Object.assign(user, emailVisible);

  await user.save();
};

exports.updateVisibilityOccupation = async (id, occupationVisible) => {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";

  await Object.assign(user, occupationVisible);

  await user.save();
};

exports._delete = async (id) => {
  //const user = await User.findOne(id);
  await User.findOneAndDelete(id, { useFindAndModify: false });
};
