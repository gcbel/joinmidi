/* DEPENDENCIES */
const User = require("../models/User");

/* VARIABLES */
const userData = [
  {
    user_id: 1,
    first_name: "Admin",
    email: "admin@gmail.com",
    password: "password",
  },
  {
    user_id: 2,
    first_name: "Dr. Melody",
    email: "clinician@gmail.com",
    is_clinician: true,
    password: "password",
  },
  {
    user_id: 3,
    first_name: "Jane",
    email: "advocate@gmail.com",
    password: "password",
  },
];

/* FUNCTIONS */
const seedUser = () => User.bulkCreate(userData);

/* EXPORTS */
module.exports = seedUser;
