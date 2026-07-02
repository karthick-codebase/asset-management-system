const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = require("./category");
const Employee = require("./employee");

const Asset = sequelize.define(
  "Asset",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    asset_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    make: {
      type: DataTypes.STRING,
    },

    model: {
      type: DataTypes.STRING,
    },

    branch: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM("in_stock", "assigned", "scrapped"),
      defaultValue: "in_stock",
    },
  },
  {
    timestamps: true,
    tableName: "assets",
  },
);
Category.hasMany(Asset, {
  foreignKey: "category_id",
});

Asset.belongsTo(Category, {
  foreignKey: "category_id",
});

Employee.hasMany(Asset, {
  foreignKey: "assigned_to",
});

Asset.belongsTo(Employee, {
  foreignKey: "assigned_to",
});

module.exports = Asset;
