const express = require("express");

const router = express.Router();

const {
  getAssets,
  getAsset,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  assignAsset,
  returnAsset,
  scrapAsset,
} = require("../controllers/assetController");

router.put("/assign", assignAsset);
router.put("/return", returnAsset);
router.put("/scrap", scrapAsset);
// Create Asset
router.post("/", createAsset);

// Get All Assets
router.get("/", getAssets);

// Get Single Asset
router.get("/:id", getAssetById);

// Update Asset
router.put("/:id", updateAsset);

// Delete Asset
router.delete("/:id", deleteAsset);

module.exports = router;
