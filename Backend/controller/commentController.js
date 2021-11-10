const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const postComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const comment = await Comment.create({
    user: req.user._id,
    text,
  });

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  );

  if (post) {
    res.json({
      post: post,
    });
  } else {
    res.status(400);
    throw new Error("Post Not Found");
  }
});

const toggleLike = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    if (comment.likes.includes(req.user.id)) {
      const index = comment.likes.indexOf(req.user._id);
      comment.likes.splice(index, 1);
      await comment.save();
    } else {
      comment.likes.push(req.user.id);
      await comment.save();
    }
    res.send("Success");
  } else {
    res.status(400);
    throw new Error("Post Not Found");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.postId);
  let comment = await Comment.findById(req.params.id);
  if (post) {
    if (comment) {
      if (comment.user._id == req.user._id.toString()) {
        let index = post.comments.indexOf(comment._id);
        post.comments.splice(index, 1);

        comment = await Comment.deleteOne({ _id: req.params.id });
        res.send("Deleted Successfully !!");
      } else {
        res.status(404);
        res.send("Unauthorized");
      }
    } else {
      res.status(400);
      res.send(`No Comment Found With id ${id}`);
    }
  } else {
    res.status(400);
    res.send(`No Post Found With id ${postId}`);
  }
});

module.exports = { postComment, toggleLike, deleteComment };
