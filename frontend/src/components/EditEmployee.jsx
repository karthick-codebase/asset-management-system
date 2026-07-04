import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmployee = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await API.get(`/employees/${id}`);

        setForm(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
  }, [id]);

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
      await API.put(`/employees/${id}`, form);
      toast.success("Employee Detail Updated Successfully", {
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
        <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            "name",
            "employee_id",
            "email",
            "phone",
            "department",
            "branch",
          ].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              placeholder={field.replace("_", " ")}
              className="w-full px-4 py-3 border rounded-xl"
            />
          ))}

          <input
            type="date"
            name="joining_date"
            value={form.joining_date || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <select
            name="status"
            value={form.status || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>

          <button className="px-6 py-3 bg-green-600 text-white rounded-xl">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
