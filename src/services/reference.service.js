"use strict";

import Reference from "../models/reference.model";

exports.getAll = async (id) => {
  return await Reference.find({ accessory: id })
    .populate("user")
    .populate("accessory")
    .sort({ createdAt: -1 })
    .exec();
};

exports.create = async (referenceParam) => {
  const reference = new Reference(referenceParam);

  // save reference
  await reference.save();
};

exports.updateState = async (id, state) => {
  const reference = await Reference.findById(id);

  // validate
  if (!reference) throw "Reference not found";

  await Object.assign(reference, state);

  await reference.save();
};
