const express = require("express");
const cors = require("cors");
const { Employee } = require("./models/employee.js");
const category = require("./models/category.js");
const Category = require("./models/category.js");

const assets = require("./models/asset.js");
const assetHistories = require("./models/assetHistory.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const employeeRoutes = require("./routes/employeeRoutes.js");
const assetRoutes = require("./routes/assetsRoutes.js");
const assetHistoryRoutes = require("./routes/assetHistoryRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path");
require("dotenv").config();

const sequelize = require("./config/db");

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/history", assetHistoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });
