const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_KEY);

const authVefify = asyncHandler(async (req, res) => {
  const { id_token, email } = req.body;

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

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_OAUTH_KEY,
    });
    if (ticket) {
      const user = await User.findOne({ primaryEmail: email });
      //console.log(user);
      if (user) {
        if (containsAll(user)) {
          res.json({
            user: user,
            id_token,
          });
        } else {
          res.json({
            user: null,
            id_token,
          });
        }
      } else {
        const user = await User.create({
          primaryEmail: email,
        });
        res.json({
          user: null,
          id_token,
        });
      }
    } else {
      res.status(404);
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

const addDetails = asyncHandler(async (req, res) => {
  const { id_token, user } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_OAUTH_KEY,
    });

    if (ticket) {
      let userNew = await User.findOneAndUpdate(
        { primaryEmail: user.primaryEmail },
        {
          $set: {
            name: user.name,
            secondaryEmail: user.secondaryEmail,
            branch: user.branch,
            year: user.year,
          },
        }
      );

      userNew = await User.findOne({ primaryEmail: user.primaryEmail });

      if (userNew) {
        res.json({
          user: userNew,
          id_token,
        });
      } else {
        res.status(402);
        throw new Error("Invalid User Data");
      }
    } else {
      res.status(404);
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Eroor");
  }
});

module.exports = { authVefify, addDetails };