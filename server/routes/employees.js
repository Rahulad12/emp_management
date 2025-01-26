import express from "express";
import Employee from "../models/Employee.js";
import logger from "../utils/logger.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all employees
router.get("/", auth, async (req, res) => {
  logger.info("Getting employees");
  const userId = req.user.userId;
  try {
    const employees = await Employee.find({ user_id: userId });
    if (!employees) {
      logger.info("No employees found");
      return res.status(404).json({ message: "No employees found" });
    }

    logger.info("Employees fetched successfully");
    res.json(employees);
  } catch (error) {
    logger.error("Error fetching employees", error);
    res.status(500).json({ message: error.message });
  }
});

// Create employee
router.post("/", auth, async (req, res) => {
  logger.info("Creating employee");
  try {
    const employee = new Employee({
      ...req.body,
      user_id: req.user.userId,
    });
    const employeeexitst = await Employee.findOne({ email: employee.email });
    if (employeeexitst) {
      logger.info("Employee already exists");
      return res.status(400).json({ message: "Employee already exists" });
    }
    logger.info("Employee created successfully");
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    logger.error("Error creating employee", error);
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.patch("/:id", auth, isAdmin, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
