const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getPostOfUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts");
  if (user) {
    res.json({
      posts: user.posts,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserByEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ primaryEmail: req.params.email });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      primaryEmail: user.primaryEmail,
      secondaryEmail: user.secondaryEmail,
      branch: user.branch,
      year: user.year,
      ratings: user.ratings,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  getPostOfUserById,
  getUserByEmail,
};
