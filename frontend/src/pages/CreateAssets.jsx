import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateAsset = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    asset_name: "",
    asset_id: "",
    serial_number: "",
    make: "",
    model: "",
    branch: "",
    category_id: "",
  });

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
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/assets", form);

      navigate("/assets");
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Asset</h1>

        <p className="text-slate-500 mb-8">Add a new company asset</p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="asset_name"
            placeholder="Asset Name"
            value={form.asset_name}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="asset_id"
            placeholder="Asset ID"
            value={form.asset_id}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="serial_number"
            placeholder="Serial Number"
            value={form.serial_number}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Select Category</option>

            {categories&& categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="md:col-span-2 flex justify-end gap-4 mt-5">
            <button
              type="button"
              onClick={() => navigate("/assets")}
              className="px-6 py-3 rounded-xl bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAsset;
