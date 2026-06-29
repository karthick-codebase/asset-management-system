const express = require("express");

const router = express.Router();

const {
  createHistory,
  getHistories,
  getHistoryById,
  deleteHistory,
  getHistoryByAsset,
} = require("../controllers/assetHistoryController");


// Create History
router.post("/", createHistory);

// Get All History
router.get("/", getHistories);


//get the all history of single assets
router.get("/asset/:assetId", getHistoryByAsset)
// Get Single History
router.get("/:id", getHistoryById);

// Delete History
router.delete("/:id", deleteHistory);

module.exports = router;