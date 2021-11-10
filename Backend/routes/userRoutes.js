const express = require("express");
const router = express.Router();

const {
  getPostOfUserById,
  getUserByEmail,
} = require("../controller/userController");

const { authVefify, addDetails } = require("../controller/authController");

router.route("/:id/post").get(getPostOfUserById);

router.route("/email/:email").get(getUserByEmail);

router.route("/auth").post(authVefify);
router.route("/add").post(addDetails);

module.exports = router;
