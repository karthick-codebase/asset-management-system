const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Asset = require("./Asset");
const Employee = require("./Employee");

const AssetHistory = sequelize.define(
  "AssetHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    action: {
      type: DataTypes.ENUM("assigned", "returned", "scrapped"),
      allowNull: false,
    },

    reason: {
      type: DataTypes.STRING,
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "asset_histories",
  },
);
Asset.hasMany(AssetHistory, {
  foreignKey: "asset_id",
});

AssetHistory.belongsTo(Asset, {
  foreignKey: "asset_id",
});

Employee.hasMany(AssetHistory, {
  foreignKey: "employee_id",
});

AssetHistory.belongsTo(Employee, {
  foreignKey: "employee_id",
});


module.exports = AssetHistory;