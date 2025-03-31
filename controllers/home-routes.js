/* DEPENDECIES */
const router = require("express").Router();
const { Appointment, User } = require("../models/index.js"); // Import models

/* ROUTES */
router.get("/feed", async (req, res) => {
  try {
    // Get posts
    const postData = await Post.findAll({
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Render page
    res.render("feed", {
      signedIn: req.session.signedIn,
      username: req.session.username,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/post/:id", async (req, res) => {
//   try {
//     // Get post by ID
//     const postData = await Post.findOne({
//       where: { id: req.params.id },
//       include: [
//         { model: User },
//         { model: Comment, include: [{ model: User }] },
//       ],
//     });

//     if (!postData) {
//       return res.status(404).render("404", {
//         signedIn: req.session.signedIn,
//         username: req.session.username,
//       });
//     }
//     const post = postData.get({ plain: true });

//     // Render page
//     res.render("post", {
//       signedIn: req.session.signedIn,
//       username: req.session.username,
//       post,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

/* Get request for user's own dashboard page, redirects if not their own */
router.get("/dashboard/:username", async (req, res) => {
  try {
    // Ensure user is going to their own dashboard
    if (req.session.username == req.params.username) {
      // Get posts
      const postData = await Post.findAll({
        include: [
          { model: User, where: { username: req.params.username } }, // Get only user's posts
          { model: Comment, include: [{ model: User }] },
        ],
      });
      const posts = postData.map((posts) => posts.get({ plain: true }));

      // Render page
      res.render("dashboard", {
        signedIn: req.session.signedIn,
        username: req.session.username,
        posts,
      });
    } else {
      res.render("home", {
        signedIn: req.session.signedIn,
        username: req.session.username,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get request for login page */
router.get("/login", async (req, res) => {
  try {
    if (req.session.signedIn) {
      res.redirect("/locations");
      return;
    }
    // Render
    res.render("login", {
      signedIn: req.session.signedIn,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// /* Get request, if not found above, route to 404 page */
// router.get("*", async (req, res) => {
//   try {
//     // Render
//     res.render("404", {
//       signedIn: req.session.signedIn,
//       username: req.session.username,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

/* EXPORTS */
module.exports = router;
