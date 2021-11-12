
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
=======
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");
const companyRoute = require("./routes/companyRoutes");

const app = express();
>>>>>>> 0c0aff52c5952dbb393369db6b409a7669602906

app.use(express.json());
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/company", companyRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in dev mode on port ${PORT}`));
