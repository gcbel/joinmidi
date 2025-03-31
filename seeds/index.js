/* DEPENDENCIES */
const sequelize = require("../config/connection");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const seedUsers = require("./user-seeds.js");

/* FUNCTIONS */
const seedAll = async () => {
  console.log("\n SYNCING DATABASE \n");
  await sequelize.sync({ force: true });
  await User.sync();
  await Appointment.sync();
  console.log("\nDATABASE SYNCED \n");

  console.log("SEEDING DATABASE \n");
  await seedUsers();
  console.log("USERS SEEDED \n");

  console.log("DATABASE SEEDED \n");
  process.exit(0);
};

seedAll();
