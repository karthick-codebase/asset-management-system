import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const EditCategoryModal = ({ closeModal, category, refresh, categoriesData }) => {
  const [name, setName] = useState(category.name);
  const [categories, setCategories] = useState(categoriesData)

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Category name required");
      return;
    }
    const isDuplicate = categories.some(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (isDuplicate) {
      toast.error("This Category is Already Exist");
      return
    }
    try {
      await API.put(`/categories/${category.id}`, {
        name,
      });

      refresh();
      toast.success("Category Updated successully", { autoClose: 2000 });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Edit Category
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className="px-5 py-3 bg-slate-200 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-3 bg-yellow-500 text-white rounded-xl"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
