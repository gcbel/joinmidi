/* DEPENDENCIES */
const router = require("express").Router();
const { User } = require("../../models");

/* ROUTES */
/* Get route to /api/users, get all users */
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({});
    if (!users) {
      res.status(400).json();
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* Post route to /api/users/signup, creates a new user upon signup */
router.post("/signup", async (req, res) => {
  try {
    // Create credentials
    const user = await User.create({
      first_name: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
    });

    // Sign in user
    req.session.save(() => {
      req.session.signedIn = true;
      req.session.first_name = req.body.firstName;
      req.session.email = req.body.email;
      req.session.user_id = user.id;
      res.status(200).json(user);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* Post route to /api/users/login, signs a user in */
router.post("/login", async (req, res) => {
  try {
    // Search for email in database
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If email is found in database, check if password matches
    let correctPassword = false;
    if (user) {
      correctPassword = await user.checkPassword(req.body.password);
    }

    // If username not found or password doesn't match, reject
    if (!user || !correctPassword) {
      res.status(400).json({ message: "Incorrect username or password." });
    } else {
    req.session.save(() => {
      req.session.signedIn = true;
      req.session.first_name = user.first_name;
      req.session.email = req.body.email;
      req.session.user_id = user.id;
      res.status(200).json({ user: user, message: "Success!" });
    });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* Post route to /api/users/logout, logs user out */
router.post("/logout", (req, res) => {
  if (req.session.signedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/check-email/:email", async (req, res) => {
  try {
    const email = await User.findOne({
      where: { email: req.params.email },
    });
    if (!email) {
      return res.status(200).json({ exists: false });
    }
    res.status(200).json({ exists: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/session', (req, res) => {
  if (req.session && req.session.email) {
    console.log(req.session)
    res.json({ email: req.session.email, first_name: req.session.first_name });
  } else {
    res.status(401).json({ message: 'No session found or user not logged in.' });
  }
});

/* EXPORTS */
module.exports = router;
