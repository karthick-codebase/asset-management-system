import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import {toast} from "react-toastify"
const EditAsset = () => {
  const { id } = useParams();

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

  const fetchAsset = async () => {
    try {
      const res = await API.get(`/assets/${id}`);

      const asset = res.data.data;

      setForm({
        asset_name: asset.asset_name,

        asset_id: asset.asset_id,

        serial_number: asset.serial_number,

        make: asset.make,

        model: asset.model,

        branch: asset.branch,

        category_id: asset.category_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAsset();

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
      await API.put(`/assets/${id}`, form);
      toast.success("Asset Detail Updated Successfully", {
        autoClose: 2000,
      });

      navigate(`/assets/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800">Edit Asset</h1>

        <p className="text-slate-500 mt-2 mb-8">Update asset information</p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="asset_name"
            value={form.asset_name}
            onChange={handleChange}
            placeholder="Asset Name"
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="asset_id"
            value={form.asset_id}
            onChange={handleChange}
            placeholder="Asset ID"
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="serial_number"
            value={form.serial_number}
            onChange={handleChange}
            placeholder="Serial Number"
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="make"
            value={form.make}
            onChange={handleChange}
            placeholder="Make"
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model"
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="branch"
            value={form.branch}
            onChange={handleChange}
            placeholder="Branch"
            className="border rounded-xl px-4 py-3"
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl bg-slate-200"
            >
              Cancel
            </button>

            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              Update Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;
