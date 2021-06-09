const passport = require("passport");
const googleStatergy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => { // User is a mongoose model here
    done(null, user.id);
});

passport.deserializeUser((id, done) => { // id is the userID - convert to mongoose model using this
    User.findById(id)
    .then(user => { // User fetched from MongoDB - user instance
        done(null,user);
    });
});

//Mapping the passport with the Google Statergy to be used in this app
//When the app is started we need the new google statergy
passport.use(
  new googleStatergy(
    {
      clientID: keys.googleAPIClientID,
      clientSecret: keys.googleAPIClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //Already having record for the record
          done(null, existingUser);
        } else {
          //Create a new record with the ID
          new User({
            googleId: profile.id, // Creates a new instance for the Mongoose Model
          })
            .save()
            .then((user) => done(null, user)); // Second instance here as part of chaining function, both refers the same user
        }
      });
    }
  )
);
