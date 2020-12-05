"use strict";

import expressJwt from "express-jwt";

import userService from "../services/user.service";

function jwt() {
  const secret = process.env.JWT_ENCRYPTION;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/login",
      "/api/users/register",
    ],
  });
}
module.exports = jwt;

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
