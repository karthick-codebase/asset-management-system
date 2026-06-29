import React from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const DeleteCategoryModal = ({ closeModal, categoryId, refresh }) => {
  const handleDelete = async () => {

    try {
      await API.delete(`/categories/${categoryId}`);
      toast.success("Category deleted", {
        autoClose: 2000,
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#9a2a2a",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      refresh();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Delete Category</h2>

        <p className="text-slate-500 mb-6">
          Are you sure you want to delete this category?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-5 py-3 rounded-xl bg-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-3 rounded-xl bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
