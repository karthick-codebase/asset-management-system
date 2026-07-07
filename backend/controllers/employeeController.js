const Employee = require("../models/employee");
const { Op, json } = require("sequelize");

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const {
      name,
      employee_id,
      email,
      phone,
      department,
      branch,
      joining_date,
      status,
    } = req.body;

    // Required Fields
    if (!name || !employee_id || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, Employee ID and Email are required.",
      });
    }

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message: "Name must contain only alphabets.",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Employee ID / Email Duplicate Check
    const existingEmployee = await Employee.findOne({
      where: {
        [Op.or]: [{ employee_id }, { email }],
      },
    });

    if (existingEmployee) {
      if (existingEmployee.employee_id === employee_id) {
        return res.status(409).json({
          success: false,
          message: "Employee ID already exists.",
        });
      }

      if (existingEmployee.email === email) {
        return res.status(409).json({
          success: false,
          message: "Email address already exists.",
        });
      }
    }

    // Create Employee
    const employee = await Employee.create({
      name,
      employee_id,
      email,
      phone,
      department,
      branch,
      joining_date,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully.",
      data: employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the employee.",
    });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows } = await Employee.findAndCountAll({
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
      message: error.message,
    });
  }
};

// Get Single Employee
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      employee_id,
      email,
      phone,
      department,
      branch,
      joining_date,
      status,
    } = req.body;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    // Required Fields
    if (!name || !employee_id || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, Employee ID and Email are required.",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Duplicate Check (Exclude Current Employee)
    const existingEmployee = await Employee.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        [Op.or]: [{ employee_id }, { email }],
      },
    });

    if (existingEmployee) {
      if (existingEmployee.employee_id === employee_id) {
        return res.status(409).json({
          success: false,
          message: "Employee ID already exists.",
        });
      }

      if (existingEmployee.email === email) {
        return res.status(409).json({
          success: false,
          message: "Email address already exists.",
        });
      }
    }

    await employee.update({
      name,
      employee_id,
      email,
      phone,
      department,
      branch,
      joining_date,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      data: employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the employee.",
    });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await employee.destroy();

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
