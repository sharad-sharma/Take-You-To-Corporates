const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const getAllCompanies = asyncHandler(async (req, res) => {
  const posts = await Post.find({}, { company: 1 });
  let companyList = posts.map(({ company }) => company);
  let uniqueItems = [...new Set(companyList)];
  res.json(uniqueItems);
});

const getPostByCompany = asyncHandler(async (req, res) => {
  const post = await Post.find({ company: req.params.company })
    .populate("user", "name")
    .sort({
      updatedAt: -1,
    });
  if (post && post.length > 0) {
    res.send(post);
  } else {
    res.status(404);
    throw new Error(`No Experiences for ${req.params.company}`);
  }
});

const getInsightsByCompany = asyncHandler(async (req, res) => {
  const post = await Post.find({ company: req.params.company });
  if (post && post.length > 0) {
    let ratings = {
      dataStructuresAndAlgoriths: 0,
      dbms: 0,
      operatingSystems: 0,
      computerNetworks: 0,
      systemDesign: 0,
      aptitude: 0,
      communicationSkills: 0,
    };

    for (let i = 0; i < post.length; i++) {
      for (let key of Object.keys(ratings)) {
        ratings[key] += post[i].ratings[key];
      }
    }
    let cardsData = [];

    cardsData.push({
      title: "DSA",
      percent: ratings["dataStructuresAndAlgoriths"] / (post.length * 10),
    });
    cardsData.push({
      title: "Operating System",
      percent: ratings["operatingSystems"] / (post.length * 10),
    });
    cardsData.push({
      title: "DBMS",
      percent: ratings["dbms"] / (post.length * 10),
    });
    cardsData.push({
      title: "Computer Networks",
      percent: ratings["computerNetworks"] / (post.length * 10),
    });
    cardsData.push({
      title: "System Design & Development",
      percent: ratings["systemDesign"] / (post.length * 10),
    });
    cardsData.push({
      title: "Aptitude",
      percent: ratings["aptitude"] / (post.length * 10),
    });
    cardsData.push({
      title: "Communication Skills",
      percent: ratings["communicationSkills"] / (post.length * 10),
    });

    let result = {
      name: post[0].company,
      number: post.length,
      cardsData,
    };
    res.send(result);
  } else {
    res.status(404);
    throw new Error(`No Insights Found For ${req.params.company}`);
  }
});

module.exports = { getAllCompanies, getPostByCompany, getInsightsByCompany };
