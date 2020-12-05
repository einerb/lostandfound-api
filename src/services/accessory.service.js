"use strict";

import qrcode from "qrcode";

import Accessory from "../models/accessory.model";
import User from "../models/user.model";
import Photo from "../models/photo.model";

exports.getAll = async () => {
  return await Accessory.find()
    .sort({ createdAt: -1 })
    .populate("user")
    .populate({ path: "photos", populate: { path: "photos" } })
    .sort({ updatedAt: -1 })
    .exec();
};

exports.getAllPhotos = async (id) => {
  return await Photo.find({ accessory: id }).sort({ createdAt: -1 }).exec();
};

exports.getByIdPhoto = async (id) => {
  return await Photo.findById(id).exec();
};

exports.getById = async (id) => {
  return await Accessory.findById(id)
    .populate("user")
    .populate({ path: "photos", populate: { path: "photos" } })
    .sort({ updatedAt: -1 })
    .exec();
};

exports.create = async (id, accesoryParam) => {
  const data = {
    name: accesoryParam.name,
    description: accesoryParam.description,
    lost_date: accesoryParam.lost_date,
    place_date: accesoryParam.place_date,
    reward: accesoryParam.reward,
    category: accesoryParam.category,
  };

  const accessory = new Accessory(data);
  const user = await User.findById(id);
  if (!user) throw "User not found";

  // Generate QR code = User ID + UUID4
  const urlHost = process.env.URL_HOST;
  const url = `${urlHost}/details/${user.id}/${accessory.id}`;
  const QR = await qrcode.toDataURL(url);

  // save accessory
  await accessory.save();
  await accessory.updateOne({ $set: { qr: QR, user: id } });
  await accessory.save();

  const query = await Accessory.find().sort({ $natural: -1 }).limit(1);

  await user.updateOne({ $push: { accessories: query } });

  user.save();
};

exports.update = async (id, accesoryParam) => {
  const accessory = await Accessory.findById(id);

  // validate
  if (!accessory) throw "Accessory not found";
  if (
    accessory.qr !== accesoryParam.qr &&
    (await Accessory.findOne({ qr: accesoryParam.qr }))
  ) {
    throw 'Name "' + accesoryParam.name + '" is already taken';
  }

  await Object.assign(accessory, accesoryParam);

  await accessory.save();
};

exports.updateState = async (id, state) => {
  const accessory = await Accessory.findById(id);

  // validate
  if (!accessory) throw "Accessory not found";

  await Object.assign(accessory, state);

  await accessory.save();
};

exports._delete = async (id) => {
  await Accessory.deleteOne({ _id: id });
};
