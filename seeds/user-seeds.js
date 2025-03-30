/* DEPENDENCIES */
const User = require("../models/User");

/* VARIABLES */
const userData = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
  },
  {
    username: "clinician",
    email: "clinician@gmail.com",
    isClinician: true,
    password: "password",
  },
  {
    username: "advocate",
    email: "advocate@gmail.com",
    password: "password",
  },
];

/* FUNCTIONS */
const seedUser = () => User.bulkCreate(userData);

/* EXPORTS */
module.exports = seedUser;
