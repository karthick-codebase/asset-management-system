import React, { useEffect, useState } from "react";
import API from "../services/api";

import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const [editCategory, setEditCategory] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Categories</h1>

            <p className="text-slate-500">Manage asset categories</p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl"
          >
            + Add Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Name</th>

                <th className="text-left p-4">Created</th>

                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{cat.name}</td>

                  <td className="p-4 text-slate-500">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => setEditCategory(cat)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-xl"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => setDeleteId(cat.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddCategoryModal
          closeModal={() => setShowAdd(false)}
          refresh={fetchCategories}
        />
      )}

      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          closeModal={() => setEditCategory(null)}
          refresh={fetchCategories}
        />
      )}

      {deleteId && (
        <DeleteCategoryModal
          categoryId={deleteId}
          closeModal={() => setDeleteId(null)}
          refresh={fetchCategories}
        />
      )}
    </div>
  );
};

export default Categories;
