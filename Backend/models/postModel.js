const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],

    experience: {
      type: String,
      required: true,
    },

    ratings: {
      dataStructuresAndAlgoriths: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
      dbms: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
      operatingSystems: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
      computerNetworks: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
      systemDesign: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
      aptitude: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
      communicationSkills: {
        type: Number,
        required: true,
        min: [1, "Rating can't be less than 1"],
        max: [10, "Rating can't be greater than 10"],
      },
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
