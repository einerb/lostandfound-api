"use strict";

import userService from "../services/user.service";

exports.auth = (req, res, next) => {
  userService
    .auth(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Email or password is incorrect!" })
    )
    .catch((err) => next(err));
};

exports.register = (req, res, next) => {
  userService
    .create(req.body)
    .then(() =>
      res.status(200).json({
        message: "User successfully registered!",
      })
    )
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  userService
    .getAll()
    .then((users) =>
      res.status(200).json({
        data: users,
        message: "Successful user list!",
      })
    )
    .catch((err) => next(err));
};

exports.getById = (req, res, next) => {
  userService
    .getById(req.params.id)
    .then((user) =>
      user
        ? res.status(200).json({
            data: user,
            message: "Successful user list!",
          })
        : res.status(404).json({
            message: "User not found!",
          })
    )
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  userService
    .update(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated user!",
      })
    )
    .catch((err) => next(err));
};

exports.updateVisibilityPhone = (req, res, next) => {
  userService
    .updateVisibilityPhone(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated user!",
      })
    )
    .catch((err) => next(err));
};

exports.updateVisibilityEmail = (req, res, next) => {
  userService
    .updateVisibilityEmail(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated user!",
      })
    )
    .catch((err) => next(err));
};

exports.updateVisibilityOccupation = (req, res, next) => {
  userService
    .updateVisibilityOccupation(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated user!",
      })
    )
    .catch((err) => next(err));
};

exports._delete = (req, res, next) => {
  userService
    ._delete(req.params.id)
    .then(() =>
      res.status(200).json({
        message: "User successfully deleted!",
      })
    )
    .catch((err) => next(err));
};
