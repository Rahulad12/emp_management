import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Building2,
  Calendar,
  Briefcase,
  UserCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import type { Employee, AttendanceLog, AttendanceFormData } from "../types";
import { AttendanceForm } from "./AttendanceForm";
import { AttendanceList } from "./AttendanceList";
import { createAttendanceLog, getAttendanceLogs } from "../lib/api.ts";

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
  userRole: "admin" | "employee";
}

export function EmployeeDetails({
  employee,
  onClose,
  userRole,
}: EmployeeDetailsProps) {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
  const [currentStatus, setCurrentStatus] = useState(employee.status);
  const [leaveMessage, setLeaveMessage] = useState("");
  const [isSendingLeave, setIsSendingLeave] = useState(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceLogs = async () => {
      try {
        const logs = await getAttendanceLogs(employee._id);
        setAttendanceLogs(logs);
      } catch (error: any) {
        console.error("Error fetching attendance logs:", error);
        const errorMessage = error.response?.data?.message || "Failed to fetch attendance logs.";
        toast.error(errorMessage);
      }
    };

    fetchAttendanceLogs();
  }, [employee._id]);

  const handleAddAttendance = async (attendance: AttendanceFormData) => {
    try {
      const newLog = await createAttendanceLog(attendance);
      setAttendanceLogs((prevLogs) => [...prevLogs, newLog]);
      toast.success("Attendance log added successfully.");
    } catch (error: any) {
      console.error("Error adding attendance log:", error);
      const errorMessage = error.response?.data?.message || "Failed to add attendance log.";
      toast.error(errorMessage);
    }
  };

  const handleLeaveRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveMessage.trim()) {
      setLeaveError("Leave message cannot be empty.");
      return;
    }

    setIsSendingLeave(true);
    setLeaveError(null);

    try {
      // Simulating leave request submission
      setCurrentStatus("on_leave");
      setLeaveMessage("");
      toast.success("Leave request sent successfully.");
    } catch (error: any) {
      console.error("Error sending leave request:", error);
      const errorMessage = error.response?.data?.message || "Failed to send leave request.";
      setLeaveError(errorMessage);
    } finally {
      setIsSendingLeave(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  {employee.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Building2 className="h-5 w-5 mr-2" />
                  {employee.department}
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-5 w-5 mr-2" />
                  {employee.position}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  Joined: {new Date(employee.join_date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <UserCircle className="h-5 w-5 mr-2" />
                  Status:{" "}
                  <span className="ml-1 capitalize">
                    {currentStatus.replace("_", " ")}
                  </span>
                </div>
              </div>

              {userRole === "employee" && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Request Leave</h3>
                  <form onSubmit={handleLeaveRequest}>
                    <textarea
                      value={leaveMessage}
                      onChange={(e) => setLeaveMessage(e.target.value)}
                      placeholder="Enter your leave request reason..."
                      className="w-full p-2 border rounded-md"
                      rows={3}
                    />
                    {leaveError && (
                      <div className="mt-2 text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {leaveError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSendingLeave}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSendingLeave ? "Sending..." : "Submit Request"}
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div>
              {userRole === "employee" && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Log Attendance</h3>
                  <AttendanceForm
                    employee={employee}
                    onSubmit={handleAddAttendance}
                  />
                </div>
              )}
              <AttendanceList attendanceLogs={attendanceLogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
