/* DEPENDENCIES */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

/* FUNCTIONS */
/* Get URL to return to after google authentication */
function getCallbackURL() {
  if (process.env.DB_URL) {
    return "https://vector-space.onrender.com/auth/google/callback";
  }
  return "http://localhost:3001/auth/google/callback";
}

/* Get check user api call */
function getCheckUserURL() {
  if (process.env.DB_URL) {
    return "https://vector-space.onrender.com/api/users/check-user/";
  }
  return "http://localhost:3001/api/users/check-user/";
}

/* Create usernames for Google Auth users */
async function getUsername(email) {
  const atIndex = email.indexOf("@");
  const baseUsername = email.substring(0, atIndex);
  let username = baseUsername;
  let count = 1;

  while (count < 100) {
    try {
      const checkUserURL = getCheckUserURL();
      const response = await fetch(`${checkUserURL}${username}`);
      if (response.ok) {
        const { exists } = await response.json();
        if (!exists) {
          return username.toString(); // Username is available
        } else {
          username = `${baseUsername}${count}`;
          count++;
        }
      } else {
        throw new Error("Failed to check username");
      }
    } catch (error) {
      console.error("Error getting Google Auth username:", error);
    }
  }
}

/* PASSPORT */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: getCallbackURL(),
    },
    async function (token, tokenSecret, profile, done) {
      try {
        const username = await getUsername(profile.emails[0].value);
        const [user, created] = await User.findOrCreate({
          where: {
            googleId: profile.id,
          },
          defaults: {
            first: profile.name.givenName,
            last: profile.name.familyName,
            username: username,
            email: profile.emails[0].value,
          },
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* EXPORTS */
module.exports = passport;
