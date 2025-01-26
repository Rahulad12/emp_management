import express from "express";
import Attendance from "../models/Attendance.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get attendance logs for an employee
router.get("/:employeeId", auth, async (req, res) => {
  try {
    const logs = await Attendance.find({ employee_id: req.params.employeeId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create attendance log
router.post("/", auth, async (req, res) => {
  try {
    const attendance = new Attendance(req.body);

    //check date of attendance
    const date = new Date(attendance.date);
    const today = new Date();
    if (date > today) {
      return res.status(400).json({ message: "Date cannot be in the future" });
    }

    const employee = await Attendance.findOne({
      employee_id: req.body.employee_id,
      date: req.body.date,
    });
    if (employee) {
      return res.status(400).json({
        message: "Attendance already exists for this employee on this date",
      });
    }
    const newAttendance = await attendance.save();
    res.status(201).json({message:"Attendance log created", newAttendance});

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
