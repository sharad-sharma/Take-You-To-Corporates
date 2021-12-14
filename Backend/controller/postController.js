const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

let _ = require("lodash");

const createPost = asyncHandler(async (req, res) => {
  const { company, profile, title, tags, experience, ratings } = req.body;

  const post = await Post.create({
    company,
    profile,
    title,
    tags: _.uniq(tags.split(",").map((item) => item.trim())),
    experience,
    ratings,
    user: req.user._id,
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  if (post) {
    res.status(201).json({
      _id: post._id,
      user: user,

      title: post.title,
      company: post.company,
      tags: post.tags,
      profile: post.profile,

      experience: post.experience,

      ratings: post.ratings,
    });
  } else {
    res.status(500);
    res.send("Server Error !");
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user",
        model: "User",
        select: "name",
      },
    });
  if (post) {
    res.send(post);
  } else {
    res.status(400);
    throw new Error(`No Post with ${req.params.id}`);
  }
});

const deletePostById = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id).populate("user", "name");
  if (post) {
    if (post.user._id == req.user._id.toString()) {
      await Comment.deleteMany({ _id: { $in: post.comments } });

      const user = await User.findById(post.user._id);
      const index = user.posts.indexOf(post._id);
      user.posts.splice(index, 1);

      post = await Post.deleteOne({ _id: req.params.id });
      await user.save();
      res.send("Deleted Successfully !!");
    } else {
      res.status(404);
      res.send("Unauthorized");
    }
  } else {
    res.status(400);
    throw new Error(`No Post with ${req.params.id}`);
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate("user", "name")
    .sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = { createPost, getPostById, getAllPosts, deletePostById };