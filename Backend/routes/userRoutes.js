const express = require("express");
const router = express.Router();

const {
  getPostOfUserById,
  getUserByEmail,
  getUserProfile,
} = require("../controller/userController");

const { authVefify, addDetails } = require("../controller/authController");

router.route("/:id/post").get(getPostOfUserById);
router.route("/:id/").get(getUserProfile);

router.route("/email/:email").get(getUserByEmail);

router.route("/auth").post(authVefify);
router.route("/add").post(addDetails);

module.exports = router;