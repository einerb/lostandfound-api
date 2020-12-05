"use strict";

import userController from "../controllers/user.controller";
import accessoryController from "../controllers/accessory.controller";
import referenceController from "../controllers/reference.controller";

module.exports = (app) => {
  var router = require("express").Router();

  // User Routes
  router.post("/users/login", userController.auth);
  router.post("/users/register", userController.register);
  router.get("/users/", userController.getAll);
  router.get("/users/:id", userController.getById);
  router.put("/users/update/:id", userController.update);
  router.put(
    "/users/visibilityPhone/:id",
    userController.updateVisibilityPhone
  );
  router.put(
    "/users/visibilityOccupation/:id",
    userController.updateVisibilityOccupation
  );
  router.put(
    "/users/visibilityEmail/:id",
    userController.updateVisibilityEmail
  );

  // Accessory Routes
  router.post("/accessories/create/:id", accessoryController.create);
  router.get("/accessories/", accessoryController.getAll);
  router.get("/accessories/photos/:id", accessoryController.getAllPhotos);
  router.get("/accessories/photo/:id", accessoryController.getByIdPhoto);
  router.post("/uploads/:id", accessoryController.upload);
  router.get("/accessories/:id", accessoryController.getById);
  router.put("/accessories/update/:id", accessoryController.update);
  router.put("/accessories/changeState/:id", accessoryController.changeState);
  router.delete("/accessories/delete/:id", accessoryController._delete);

  // User Routes
  router.post("/references/create", referenceController.create);
  router.get("/references/:id", referenceController.getAll);
  router.put("/references/update/:id", referenceController.update);

  app.use("/api/", router);
};
