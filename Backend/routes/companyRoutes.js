const express = require("express");
const router = express.Router();

const {
  getAllCompanies,
  getPostByCompany,
  getInsightsByCompany,
} = require("../controller/companyController");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getAllCompanies);
router.route("/:company").get(protect, getPostByCompany);
router.route("/:company/insights").get(protect, getInsightsByCompany);

module.exports = router;
