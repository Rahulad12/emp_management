import React, { useState } from 'react';
import { Plus, User, Mail, Briefcase, Building2, Calendar } from 'lucide-react';
import type { EmployeeFormData } from '../types';

interface EmployeeFormProps {
  onSubmit: (employee: EmployeeFormData) => void;
}

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    position: '',
    department: '',
    status: 'active',
    join_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      status: 'active',
      join_date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Plus className="h-6 w-6 mr-2 text-blue-600" />
        Add New Employee
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Name
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              Position
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="input-field"
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              Department
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="input-field"
            placeholder="Engineering"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'on_leave' })}
            className="input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Join Date
            </span>
          </label>
          <input
            type="date"
            required
            value={formData.join_date}
            onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6">
        <Plus className="h-5 w-5 mr-2" />
        Add Employee
      </button>
    </form>
  );
}