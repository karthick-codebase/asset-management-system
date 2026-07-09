import React, { useEffect, useState } from "react";
import API from "../services/api";

import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const [editCategory, setEditCategory] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get("/categories");

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg flex flex-col justify-center items-center">
        <svg
          xmlns="http://w3.org"
          width={250}
          height={100}
          viewBox="0 0 200 200"
        >
          {/* First Circle: Starts at the bottom (135) to match its -.4s animation offset */}
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="2"
            r="15"
            cx="40"
            cy="135"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            />
          </circle>

          {/* Second Circle: Starts halfway down (100) to match its -.2s animation offset */}
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            strokeWidth="2"
            r="15"
            cx="100"
            cy="100"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            />
          </circle>

          {/* Third Circle: Starts at the top (65) because it has no delay (begin="0") */}
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
            />
          </circle>
        </svg>
        Loading Category...
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-3xl">
        <div className="flex justify-between items-center mb-6 gap-6 flex-wrap bg-white shadow-lg p-6 rounded-3xl">
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

        {categories.length > 0 ? (
          <div className="overflow-x-auto mt-4 bg-white shadow-lg rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-blue-600 text-white">
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
        ) : (
          <div className="p-5 text-center text-3xl text-red-500 font-bold text-nowrap w-full">
            The Category are Empty
          </div>
        )}
      </div>

      {showAdd && (
        <AddCategoryModal
          closeModal={() => setShowAdd(false)}
          refresh={fetchCategories}
          categoriesData={categories}
        />
      )}

      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          closeModal={() => setEditCategory(null)}
          refresh={fetchCategories}
          categoriesData={categories}
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
