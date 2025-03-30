/* DEPENDENCIES */
const User = require("./User.js");
const Appointment = require("./Appointment.js");

/* ASSOCIATIONS */
User.hasMany(Appointment, {
  foreignKey: "user_id",
});

Appointment.belongsTo(User, {
  foreignKey: "user_id",
});

/* EXPORTS */
module.exports = { User, Appointment };
