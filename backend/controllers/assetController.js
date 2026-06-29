const Asset = require("../models/Asset");
const Category = require("../models/Category");
const Employee = require("../models/Employee");
const AssetHistory = require("../models/AssetHistory");
const { Op } = require("sequelize");
// Create Asset
exports.createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);

    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Assets
exports.getAssets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status;
    const category_id = req.query.category_id;
    const branch = req.query.branch;
    const whereCondition = {};

    // Search Filter
    if (search) {
      whereCondition[Op.or] = [
        {
          asset_name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          asset_id: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          serial_number: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ];
    }

    // Status Filter
    if (status) {
      whereCondition.status = status;
    }
    if (category_id) {
      whereCondition.category_id = category_id;
    }
    if (branch) {
      whereCondition.branch = branch;
    }

    const { count, rows } = await Asset.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Category,
        },
        {
          model: Employee,
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Asset
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id, {
      include: [
        {
          model: Category,
        },
        {
          model: Employee,
        },
      ],
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    await asset.update(req.body);

    res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Asset
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    await asset.destroy();

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.assignAsset = async (req, res) => {
  try {
    const { assetId, employeeId, reason } = req.body;

    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (asset.status === "assigned") {
      return res.status(400).json({
        success: false,
        message: "Asset already assigned",
      });
    }
    if (asset.status === "scrapped") {
      return res.status(400).json({
        success: false,
        message: "Scrapped assets cannot be assigned",
      });
    }

    await asset.update({
      assigned_to: employeeId,
      status: "assigned",
    });

    await AssetHistory.create({
      asset_id: assetId,
      employee_id: employeeId,
      action: "assigned",
      reason,
    });

    res.status(200).json({
      success: true,
      message: "Asset assigned successfully",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.returnAsset = async (req, res) => {
  try {
    const { assetId, reason } = req.body;

    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    if (asset.status !== "assigned") {
      return res.status(400).json({
        success: false,
        message: "Asset is not currently assigned",
      });
    }

    const employeeId = asset.assigned_to;

    await asset.update({
      assigned_to: null,
      status: "in_stock",
    });

    await AssetHistory.create({
      asset_id: asset.id,
      employee_id: employeeId,
      action: "returned",
      reason,
    });

    res.status(200).json({
      success: true,
      message: "Asset returned successfully",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.scrapAsset = async (req, res) => {
  try {
    const { assetId, reason } = req.body;

    const asset = await Asset.findByPk(assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    if (asset.status === "scrapped") {
      return res.status(400).json({
        success: false,
        message: "Asset is already scrapped",
      });
    }
    const employeeId = asset.assigned_to;

    await asset.update({
      status: "scrapped",
      assigned_to: null,
    });

    await AssetHistory.create({
      asset_id: asset.id,
      employee_id: employeeId,
      action: "scrapped",
      reason,
    });

    res.status(200).json({
      success: true,
      message: "Asset scrapped successfully",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
