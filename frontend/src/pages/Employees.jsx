import React, { useEffect, useState } from "react";
import API from "../services/api";
import { data, Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaEye } from "react-icons/fa";
import DeleteEmployeeModal from "../components/DeleteEmployeeModal";
import { toast } from "react-toastify";
import EmployeeDetailsModal from "../components/EmployeeDetails";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [deleteId, setDeleteId] = useState(null);

  const [showDelete, setShowDelete] = useState(false);

  const uniqBranches = [
    ...new Set(employees.map((emp) => emp.branch.toLowerCase().trim())),
  ];
  const uniqDepartment = [
    ...new Set(employees.map((emp) => emp.department.toLowerCase().trim())),
  ];
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/employees?page=${page}`);

      setEmployees(res.data.data);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();

    setBranch("");
    setDepartment("");
  }, [page]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());

    const matchesBranch =
      !branch.trim() || emp.branch.toLowerCase().includes(branch.toLowerCase());

    const matchesDept =
      !department.trim() ||
      emp.department.toLowerCase().includes(department.toLowerCase());

    return matchesSearch && matchesBranch && matchesDept;
  });

  const openDelete = (id) => {
    setDeleteId(id);

    setShowDelete(true);
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are You Sure to Delete Employee");
      if (confirmDelete) {
        await API.delete(`/employees/${deleteId}`);
        toast.success("Employee Deleted Sucessfully");
        setShowDelete(false);
        setDeleteId(null);
        fetchEmployees();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={250}
          height={100}
          viewBox="0 0 200 200"
        >
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="3"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="3"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="3"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
        Loading Employees...
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-5 sm:flex-row justify-between sm:items-center ">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Employees</h1>

          <p className="text-slate-500">Manage company employees</p>
        </div>

        <Link to="/employees/create">
          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            <FaPlus />
            Add Employee
          </button>
        </Link>
      </div>

      {/* filter and search option */}
      <div className="flex flex-col sm:flex-row gap-1 shrink sm:gap-5 justify-between items-center bg-violet-400/30 p-3 rounded-xl">
        <div className="p-5 flex gap-2 justify-between">
          <select
            name="department"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-rose-500 capitalize"
          >
            <option value="">All Department</option>
            {uniqDepartment.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>

          <select
            name="branch"
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-rose-800 rounded-md capitalize"
          >
            <option value="">All Branches</option>
            {uniqBranches.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        {/* Search */}
        <div className=" flex gap-2 items-center relative w-full sm:w-2/5">
          <input
            type="text"
            placeholder="Search employee..."
            name="name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 w-full rounded-3xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch
            className="absolute right-4 hover:cursor-pointer"
            size={20}
            color="gray"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-x-auto">
        {filteredEmployees && filteredEmployees.length > 0 ? (
          <div>
            <table className="w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-5 text-left">S.No</th>

                  <th className="p-5 text-left">Name</th>

                  <th className="p-5 text-left">Employee ID</th>

                  <th className="p-5 text-left">Department</th>

                  <th className="p-5 text-left">Branch</th>

                  <th className="p-5 text-left">Date Of Jion</th>

                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="border-t hover:bg-slate-50 capitalize"
                  >
                    <td className="p-5">{index + 1}</td>

                    <td className="p-5 font-medium">{emp.name}</td>

                    <td className="p-5">{emp.employee_id}</td>

                    <td className="p-5">{emp.department}</td>

                    <td className="p-5">{emp.branch}</td>
                    <td className="p-5">
                      {emp.joining_date
                        ? emp.joining_date.split("-").reverse().join("-")
                        : "N/A"}
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setShowDetails(true);
                          }}
                          className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                          title="View Employee"
                        >
                          <FaEye />
                        </button>

                        <Link to={`/employees/edit/${emp.id}`}>
                          <button className="p-3 rounded-xl bg-yellow-500 text-white">
                            <FaEdit />
                          </button>
                        </Link>

                        <button
                          onClick={() => openDelete(emp.id)}
                          className="p-3 rounded-xl bg-red-600 text-white"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}

            <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-between">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-5 py-2 border rounded-xl disabled:opacity-50"
              >
                Previous
              </button>

              <p>
                Page {page} of {totalPages}
              </p>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-5 py-2 border rounded-xl disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center font-bold text-3xl text-red-600 p-10">
            Employee Data is Empty
          </div>
        )}
      </div>

      {showDelete && (
        <DeleteEmployeeModal
          closeModal={() => setShowDelete(false)}
          confirmDelete={handleDelete}
        />
      )}

      {showDetails && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          closeModal={() => {
            setShowDetails(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default Employees;
