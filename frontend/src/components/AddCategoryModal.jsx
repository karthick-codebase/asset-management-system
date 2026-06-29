import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
const AddCategoryModal = ({ closeModal, refresh }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/categories", {
        name,
      });
      toast.success("Category created Successfully", { autoClose: 2000 });
      closeModal()
      navigate("/categories");
    } catch (error) {
      console.log(error);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40">
      <div className="mx-auto mt-10 shadow-lg rounded-3xl flex-1 max-w-xl">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Add Category
          </h1>

          <p className="text-slate-500 mb-6">Create a new asset category</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Category Name
              </label>

              <input
                type="text"
                placeholder="Example: Laptop"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-3 rounded-xl bg-slate-200"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
