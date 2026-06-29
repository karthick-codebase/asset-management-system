import React from "react";

const DeleteEmployeeModal = ({ closeModal, confirmDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-3">Delete Employee</h2>

        <p className="text-slate-500 mb-6">
          Are you sure you want to delete this employee?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-5 py-3 bg-slate-200 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="px-5 py-3 bg-red-600 text-white rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
