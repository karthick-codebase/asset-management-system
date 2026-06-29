import React from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const DeleteAssetModal = ({ closeModal, assetId, afterDelete }) => {
  const handleDelete = async () => {
    try {
      await API.delete(`/assets/${assetId}`);
      toast.success("Asset Deleted Sucessfully");
      afterDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Delete Asset</h2>

        <p className="text-slate-500 mb-6">
          Are you sure you want to delete this asset? This action cannot be
          undone.
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
            className="px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAssetModal;
