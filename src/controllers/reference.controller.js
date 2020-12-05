"use strict";

import referenceService from "../services/reference.service";

exports.create = (req, res, next) => {
  referenceService
    .create(req.body)
    .then(() =>
      res.status(200).json({
        message: "Reference successfully registered!",
      })
    )
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  referenceService
    .getAll(req.params.id)
    .then((references) =>
      res.status(200).json({
        data: references,
        message: "Successful reference list!",
      })
    )
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  referenceService
    .updateState(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated state!",
      })
    )
    .catch((err) => next(err));
};
