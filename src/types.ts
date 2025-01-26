export type UserRole = "admin" | "employee";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "on_leave";
  join_date: string;
}

export interface AttendanceLog {
  _id: string;
  employee_id: string;
  date: string;
  status: "present" | "absent" | "late" | "half_day";
  notes: string | null;
  createdAt: string;
}

export type EmployeeFormData = Omit<Employee, "id">;
export type AttendanceFormData = Omit<AttendanceLog, "id">;
