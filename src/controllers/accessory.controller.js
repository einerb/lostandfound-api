"use strict";

import accessoryService from "../services/accessory.service";
import Accessory from "../models/accessory.model";
import upload from "../services/upload.service";
import Photo from "../models/photo.model";

const singleUpload = upload.single("photos");

exports.create = (req, res, next) => {
  accessoryService
    .create(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Accessory successfully registered!",
      })
    )
    .catch((err) => next(err));
};

exports.upload = async (req, res, next) => {
  await Accessory.findById(req.params.id)
    .then((accessory) => {
      accessory
        ? singleUpload(req, res, function (err) {
            if (err) {
              return res.json({
                success: false,
                message: err.message,
              });
            }

            new Photo({ path: req.file.location })
              .save()
              .then((image) => {
                Accessory.findOneAndUpdate(
                  { _id: req.params.id },
                  { $push: { photos: image._id } }
                ).exec();
                accessory
                  .save()
                  .then((accessory) => {
                    res.status(200).json({
                      data: accessory,
                      message: "Successful accessory photo!",
                    });
                  })
                  .catch((err) => next(err));
              })
              .catch((err) => next(err));
          })
        : res.status(404).json({
            message: "Accessory not found!",
          });
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  accessoryService
    .getAll()
    .then((accessories) =>
      res.status(200).json({
        status: accessories,
        message: "Successful accessory list!",
      })
    )
    .catch((err) => next(err));
};

exports.getAllPhotos = (req, res, next) => {
  accessoryService
    .getAllPhotos(req.params.id)
    .then((photos) =>
      res.status(200).json({
        status: photos,
        message: "Successful photos list by user!",
      })
    )
    .catch((err) => next(err));
};

exports.getByIdPhoto = (req, res, next) => {
  accessoryService
    .getByIdPhoto(req.params.id)
    .then((photo) =>
      res.status(200).json({
        status: photo,
        message: "Successful photo by accessory!",
      })
    )
    .catch((err) => next(err));
};

exports.getById = (req, res, next) => {
  accessoryService
    .getById(req.params.id)
    .then((accessory) =>
      accessory
        ? res.status(200).json({
            data: accessory,
            message: "Successful accessory list!",
          })
        : res.status(404).json({
            message: "Accessory not found!",
          })
    )
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  accessoryService
    .update(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated accessory!",
      })
    )
    .catch((err) => next(err));
};

exports.changeState = (req, res, next) => {
  accessoryService
    .update(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated state!",
      })
    )
    .catch((err) => next(err));
};

exports._delete = (req, res, next) => {
  accessoryService
    ._delete(req.params.id)
    .then(() =>
      res.status(200).json({
        message: "Accessory successfully deleted!",
      })
    )
    .catch((err) => next(err));
};
