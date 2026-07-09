const AssetHistory = require("../models/assetHistory");
const Asset = require("../models/asset");
const Employee = require("../models/employee");
const { parse } = require("dotenv");

// Create History Record
exports.createHistory = async (req, res) => {
  try {
    const history = await AssetHistory.create(req.body);

    res.status(201).json({
      success: true,
      message: "History record created successfully",
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All History Records
exports.getHistories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await AssetHistory.findAndCountAll({
      include: [
        {
          model: Asset,
          attributes: ["id", "asset_name", "asset_id"],
        },
        {
          model: Employee,
          attributes: ["id", "name", "employee_id"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "History fetched successfully",
      total: count,
      page,
      pages: Math.ceil(count / limit),
      limit,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single History Record
exports.getHistoryById = async (req, res) => {
  try {
    const history = await AssetHistory.findByPk(req.params.id, {
      include: [
        {
          model: Asset,
          attributes: ["id", "asset_name", "asset_id"],
        },
        {
          model: Employee,
          attributes: ["id", "name", "employee_id"],
        },
      ],
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//all history of single assets

exports.getHistoryByAsset = async (req, res) => {
  try {
    const histories = await AssetHistory.findAll({
      where: {
        asset_id: req.params.assetId,
      },
      include: [
        {
          model: Asset,
          attributes: ["id", "asset_name", "asset_id"],
        },
        {
          model: Employee,
          attributes: ["id", "name", "employee_id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: histories.length,
      data: histories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete History Record
exports.deleteHistory = async (req, res) => {
  try {
    const history = await AssetHistory.findByPk(req.params.id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History record not found",
      });
    }

    await history.destroy();

    res.status(200).json({
      success: true,
      message: "History record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
