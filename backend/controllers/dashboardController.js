const Asset = require("../models/Asset");
const Employee = require("../models/Employee");
const Category = require("../models/Category");
const AssetHistory = require("../models/AssetHistory");

exports.getStats = async (req, res) => {
  try {
    const totalAssets = await Asset.count();

    const assignedAssets = await Asset.count({
      where: { status: "assigned" },
    });

    const availableAssets = await Asset.count({
      where: { status: "in_stock" },
    });

    const scrappedAssets = await Asset.count({
      where: { status: "scrapped" },
    });

    const totalEmployees = await Employee.count();

    const totalCategories = await Category.count();

    res.status(200).json({
      success: true,
      data: {
        totalAssets,
        assignedAssets,
        availableAssets,
        scrappedAssets,
        totalEmployees,
        totalCategories,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecentHistory = async (req, res) => {
  try {
    const history = await AssetHistory.findAll({
      limit: 10,
      order: [["date", "DESC"]],

      include: [
        {
          model: Asset,
          attributes: ["asset_name", "asset_id"],
        },
        {
          model: Employee,
          attributes: ["name", "employee_id"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
