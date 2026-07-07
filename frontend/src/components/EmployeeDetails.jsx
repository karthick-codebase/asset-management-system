import React from "react";
import {
  FaUser,
  FaIdBadge,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCodeBranch,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";

const EmployeeDetailsModal = ({ employee, closeModal }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 ">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                <FaUser />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <p className="text-blue-100">{employee.employee_id}</p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="text-white text-xl hover:rotate-90 transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Info
              icon={<FaIdBadge />}
              label="Employee ID"
              value={employee.employee_id}
            />

            <Info icon={<FaEnvelope />} label="Email" value={employee.email} />

            <Info
              icon={<FaPhone />}
              label="Phone"
              value={employee.phone || "-"}
            />

            <Info
              icon={<FaBuilding />}
              label="Department"
              value={employee.department || "-"}
            />

            <Info
              icon={<FaCodeBranch />}
              label="Branch"
              value={employee.branch || "-"}
            />

            <Info
              icon={<FaCalendarAlt />}
              label="Joining Date"
              value={employee.joining_date}
            />

            <div className="md:col-span-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  employee.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {employee.status}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-5 flex justify-end">
            <button
              onClick={closeModal}
              className="px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
    <div className="flex items-center gap-3 text-blue-600 mb-2">
      {icon}
      <span className="font-semibold">{label}</span>
    </div>

    <p className="text-slate-700">{value}</p>
  </div>
);

export default EmployeeDetailsModal;
