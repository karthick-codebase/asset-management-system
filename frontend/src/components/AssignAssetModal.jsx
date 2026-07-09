import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const AssignAssetModal = ({ closeModal, assetId, refreshAsset }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [reason, setReason] = useState("");

  const handleAssign = async () => {
    if (!selectedEmployee) {
      return;
    }
    const confirmAssign = window.confirm(
      "Are you sure you want to assign this asset?",
    );

    if (!confirmAssign) {
      return;
    }
    try {
      await API.put("/assets/assign", {
        assetId: assetId,

        employeeId: selectedEmployee,

        reason: reason,
      });

      await refreshAsset();

      closeModal();
      toast.success("Asset Assign Successfully", { autoClose: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      setEmployees(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div
      className="
        fixed inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          p-6
          w-full
          max-w-md
          shadow-xl
        "
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Assign Asset</h2>

        {/* Search Dropdown */}
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedEmployee("");
                setShowDropdown(true);
              }}
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
            "
            />
            {showDropdown && (
              <div
                className="
                absolute
                top-full
                left-0
                right-0
                mt-2
                bg-white
                border
                rounded-xl
                shadow-xl
                max-h-60
                overflow-y-auto
                z-[100]
              "
              >
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmployee(emp.id);

                        setSearch(emp.name);

                        setShowDropdown(false);
                      }}
                      className="
                      px-4
                      py-3
                      cursor-pointer
                      hover:bg-slate-100
                    "
                    >
                      <p className="font-medium text-slate-800">{emp.name}</p>

                      <p className="text-sm text-slate-500">
                        {emp.employee_id}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-3 text-slate-500">No employee found</p>
                )}
              </div>
            )}
          </div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for Assign..."
            className=" mt-5 w-full border rounded-xl px-4 py-3 h-28 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className=" px-5 py-2 rounded-xl bg-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={!selectedEmployee}
            className="
              px-5
              py-2
              rounded-xl
              bg-green-600
              text-white
              disabled:opacity-50
            "
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAssetModal;
