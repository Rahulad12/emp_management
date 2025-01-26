import axios from "axios";
import { AttendanceFormData } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token",response.data.token);
  localStorage.setItem("userRole",response.data.user.role);
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  role: string
) => {
  const response = await api.post("/auth/register", { email, password, role });
  return response.data;
};

export const getEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};

export const createEmployee = async (employeeData: any) => {
  const response = await api.post("/employees", employeeData);
  return response.data;
};

export const updateEmployee = async (id: string, employeeData: any) => {
  const response = await api.patch(`/employees/${id}`, employeeData);
  return response.data;
};

export const getAttendanceLogs = async (employeeId: string) => {
  const response = await api.get(`/attendance/${employeeId}`);
  return response.data;
};

export const createAttendanceLog = async (attendanceData: AttendanceFormData) => {
  const response = await api.post("/attendance", attendanceData);
  return response.data;
};

export default api;
