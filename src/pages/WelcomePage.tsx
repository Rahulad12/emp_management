import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeList } from "../components/EmployeeList";
import { EmployeeForm } from "../components/EmployeeForm";
import { EmployeeFormData, Employee } from "../types";
import { createEmployee, getEmployees } from "../lib/api.ts";

const WelcomePage = () => {
  const userrole = localStorage.getItem("userRole");

  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleEmployeeSubmit = async (employeeData: EmployeeFormData) => {
    try {
      await createEmployee(employeeData);

      const updatedEmployees = await getEmployees();
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <EmployeeForm onSubmit={handleEmployeeSubmit} />
      <EmployeeList employees={employees} userRole={userrole}
      />
    </div>
  );
};

export default WelcomePage;
