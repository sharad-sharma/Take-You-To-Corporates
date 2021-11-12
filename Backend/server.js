const express = require('express');
const passport = require('passport')
var cookieParser = require('cookie-parser');

const profileRoutes = require("./routes/profile-routes");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require('./config/passport-setup')
const session = require("express-session");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set cookie session 
// TODO: Go through it again
// app.use(cookieSession({
//   maxAge: 24*60*60*1000,
//   keys: [keys.session.cookieKey]
// }))

app.use(session({secret: "secret"}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.send("Take you to Corporates");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app now listening for requests on port ${port}`);
});