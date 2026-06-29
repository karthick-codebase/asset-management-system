const express = require("express");
const router = express.Router();

const {
  getStats,
  getRecentHistory,
} = require("../controllers/dashboardController");

router.get("/stats", getStats);
router.get("/recent-history", getRecentHistory);

module.exports = router;
