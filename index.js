const express = require("express");
const mongoose = require("mongoose");
const cokieSession = require('cookie-session');
const passport = require('passport');

const keys = require("./config/keys");
require("./models/User"); //MongoDB Model Object Reference
require("./services/passport");

//we have an alternate JS method to be used
//const authRoutes = require('./routes/authRoutes');

//represents a new Express application running in app object
const app = express();

app.use(
    cokieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //Cookie to last 30 days - converted to milliseconds
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
