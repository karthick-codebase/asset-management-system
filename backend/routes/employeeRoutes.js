const express = require("express");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

// Create Employee
router.post("/", createEmployee);

// Get All Employees
router.get("/", getEmployees);

// Get Single Employee
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

module.exports = router;