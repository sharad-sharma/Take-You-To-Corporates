const express = require("express");
const router = express.Router();

const {
  createPost,
  getPostById,
  getAllPosts,
  deletePostById,
} = require("../controller/postController");

const {
  postComment,
  deleteComment,
  toggleLike,
} = require("../controller/commentController");

const { protect } = require("../middleware/auth");

router.route("/").post(protect, createPost).get(protect, getAllPosts);
router.route("/:id").get(protect, getPostById).delete(protect, deletePostById);

router.route("/:postId/comment/:id").delete(protect, deleteComment);

router.route("/comment/:id").post(protect, postComment);
router.route("/comment/:id/toggleLike").post(protect, toggleLike);

module.exports = router;
