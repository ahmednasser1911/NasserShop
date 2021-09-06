import bcrypt from "bcryptjs";

const users = [
  {
    name: "Ahmed",
    email: "ahmed@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "Nasser",
    email: "nasser@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },

  {
    name: "Mady",
    email: "madyd@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
