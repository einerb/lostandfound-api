import User from "../models/user.model";
import { user } from "./user.seed";
import logger from "../utils/logger";

export default async function () {
  const handleUser = async ({ ...user }) => {
    let us = await User.findOne({ email: user.email });

    if (us) return logger.info("🚀 Super Admin already exists!");
    if (!us) logger.info("🚀 Super Admin successfully registered!");

    us = new User(user);

    await us.save();
  };
  await Promise.all(user.map((user) => handleUser(user)));
}
