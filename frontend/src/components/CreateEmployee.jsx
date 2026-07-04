import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    email: "",
    phone: "",
    department: "",
    branch: "",
    joining_date: "",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Employee name is required");
      return false;
    }

    if (!form.employee_id.trim()) {
      toast.error("Employee ID is required");
      return false;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(form.phone)) {
      toast.error("Phone number must contain 10 digits");
      return false;
    }

    if (!form.department.trim()) {
      toast.error("Department is required");
      return false;
    }

    if (!form.branch.trim()) {
      toast.error("Branch is required");
      return false;
    }

    if (!form.joining_date) {
      toast.error("Joining date is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return
    } 

    try {
      const response = await API.post("/employees", form);
      toast.success("The New  Employee Created Successfully", {
        autoClose: 2000,
      });
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Add Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Employee Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            name="employee_id"
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            type="tel"
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="date"
            name="joining_date"
            value={form.joining_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-5 py-3 bg-slate-200 rounded-xl"
            >
              Cancel
            </button>

            <button className="px-5 py-3 bg-blue-600 text-white rounded-xl">
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
