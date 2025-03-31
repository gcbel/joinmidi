/* DEPENDENCIES */
const User = require("../models/User");

/* VARIABLES */
const userData = [
  {
    user_id: 1,
    email: "admin@gmail.com",
    password: "password",
  },
  {
    user_id: 2,
    email: "clinician@gmail.com",
    isClinician: true,
    password: "password",
  },
  {
    user_id: 3,
    email: "advocate@gmail.com",
    password: "password",
  },
];

/* FUNCTIONS */
const seedUser = () => User.bulkCreate(userData);

/* EXPORTS */
module.exports = seedUser;
