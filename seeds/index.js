/* DEPENDENCIES */
const sequelize = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const seedUsers = require("./user-seeds.js");
const seedPosts = require("./post-seeds.js");
const seedComments = require("./comment-seeds.js");

/* FUNCTIONS */
const seedAll = async () => {
  console.log("\n SYNCING DATABASE \n");
  await sequelize.sync({ force: true });
  await User.sync();
  await Post.sync();
  await Comment.sync();
  console.log("\n DATABASE SYNCED \n");

  console.log("\n SEEDING DATABASE \n");
  await seedUsers();
  console.log("\n USERS SEEDED \n");

  await seedPosts();
  console.log("\n POSTS SEEDED \n");

  await seedComments();
  console.log("\n COMMENTS SEEDED \n");

  console.log("\n DATABASE SEEDED \n");
  process.exit(0);
};

seedAll();
