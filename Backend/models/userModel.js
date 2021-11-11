const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    primaryEmail: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      // required: true,
    },

    secondaryEmail: {
      type: String,
      // required: true,
      unique: true,
    },

    branch: {
      type: String,
      //   required: true,
    },

    year: {
      type: Number,
      //   required: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
