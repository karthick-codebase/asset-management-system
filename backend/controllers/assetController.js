const Asset = require("../models/asset");
const Category = require("../models/category");
const Employee = require("../models/employee");
const AssetHistory = require("../models/assetHistory");
const { Op } = require("sequelize");
// Create Asset
exports.createAsset = async (req, res) => {
  try {
    const {
      asset_name,
      asset_id,
      serial_number,
      make,
      model,
      branch,
      category_id,
    } = req.body;

    // Required Fields
    if (!asset_name || !asset_id || !serial_number || !category_id) {
      return res.status(400).json({
        success: false,
        message:
          "Asset Name, Asset ID, Serial Number and Category are required.",
      });
    }

    // Category Validation
    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Selected category does not exist.",
      });
    }

    // Duplicate Validation
    const existingAsset = await Asset.findOne({
      where: {
        [Op.or]: [{ asset_id }, { serial_number }],
      },
    });

    if (existingAsset) {
      if (existingAsset.asset_id === asset_id) {
        return res.status(409).json({
          success: false,
          message: "Asset ID already exists.",
        });
      }

      if (existingAsset.serial_number === serial_number) {
        return res.status(409).json({
          success: false,
          message: "Serial Number already exists.",
        });
      }
    }

    // Create Asset
    const asset = await Asset.create({
      asset_name,
      asset_id,
      serial_number,
      make,
      model,
      branch,
      category_id,
    });

    return res.status(201).json({
      success: true,
      message: "Asset created successfully.",
      data: asset,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the asset.",
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
    const { id } = req.params;

    const {
      asset_name,
      asset_id,
      serial_number,
      make,
      model,
      branch,
      category_id,
    } = req.body;

    // Check Asset
    const asset = await Asset.findByPk(id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found.",
      });
    }

    // Required Fields
    if (!asset_name || !asset_id || !serial_number || !category_id) {
      return res.status(400).json({
        success: false,
        message:
          "Asset Name, Asset ID, Serial Number and Category are required.",
      });
    }

    // Check Category
    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Selected category does not exist.",
      });
    }

    // Check Duplicate Asset ID / Serial Number
    const existingAsset = await Asset.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        [Op.or]: [{ asset_id }, { serial_number }],
      },
    });

    if (existingAsset) {
      if (existingAsset.asset_id === asset_id) {
        return res.status(409).json({
          success: false,
          message: "Asset ID already exists.",
        });
      }

      if (existingAsset.serial_number === serial_number) {
        return res.status(409).json({
          success: false,
          message: "Serial Number already exists.",
        });
      }
    }

    // Update Asset
    await asset.update({
      asset_name,
      asset_id,
      serial_number,
      make,
      model,
      branch,
      category_id,
    });

    return res.status(200).json({
      success: true,
      message: "Asset updated successfully.",
      data: asset,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the asset.",
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
