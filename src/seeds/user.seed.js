import bcrypt from "bcryptjs";

export const user = [
  {
    name: "super",
    lastname: "admin",
    city: "barranquilla",
    birthdate: "12/12/2012",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    state: true,
    role: true,
  },
];
