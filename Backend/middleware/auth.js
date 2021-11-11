const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { OAuth2Client } = require("google-auth-library");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  let containsAll = (user) => {
    if (
      user.name &&
      user.secondaryEmail &&
      user.secondaryEmail &&
      user.branch &&
      user.year
    )
      return true;
    return false;
  };

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const client = new OAuth2Client(process.env.GOOGLE_OAUTH_KEY);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_OAUTH_KEY,
      });
      if (ticket) {
        const user = await User.findOne({ primaryEmail: ticket.payload.email });
        if (user) {
          if (containsAll(user)) {
            req.user = user;
            console.log(user);
            return next();
          }
        }
      }
      console.log("Invalid credentials");
      res.status(404);
      throw new Error("Invalid User Data");
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
