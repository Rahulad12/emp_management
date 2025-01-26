import React, { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import type { AttendanceFormData, Employee } from "../types";

interface AttendanceFormProps {
  employee: Employee;
  onSubmit: (attendance: AttendanceFormData) => void;
}

export function AttendanceForm({ employee, onSubmit }: AttendanceFormProps) {
  const [formData, setFormData] = useState<AttendanceFormData>({
    employee_id: employee._id,
    date:"",
    status: "present",
    notes: "",
    createdAt: "",
  });

  const handleInputChange = (
    field: keyof AttendanceFormData,
    value: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const attendanceData: AttendanceFormData = {
      employee_id: employee._id,
      date: formData.date,
      status: formData.status,
      notes: formData.notes,
      // _id: "",
      createdAt: "",
    };

    onSubmit(attendanceData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Status Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              handleInputChange(
                "status",
                e.target.value as AttendanceFormData["status"]
              )
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="half_day">Half Day</option>
          </select>
        </div>

        {/* Notes Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ClipboardCheck className="h-5 w-5 mr-2" />
        Log Attendance
      </button>
    </form>
  );
}
