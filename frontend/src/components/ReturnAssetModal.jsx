import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const ReturnAssetModal = ({ closeModal, assetId, refreshAsset }) => {
  const [reason, setReason] = useState("");

  const handleReturn = async () => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this asset?",
    );

    if (!confirmReturn) {
      return;
    }

    try {
      await API.put("/assets/return", {
        assetId,

        reason: reason || "Asset returned",
      });

      await refreshAsset();
      toast.success("Asset Return Successfully", { autoClose: 2000 });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="-mt-6
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
        <h2
          className="
          text-2xl
          font-bold
          text-slate-800
          mb-5
        "
        >
          Return Asset
        </h2>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for return..."
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            h-28
            resize-none
          "
        />

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >
          <button
            onClick={closeModal}
            className="
              px-5
              py-2
              rounded-xl
              bg-slate-200
            "
          >
            Cancel
          </button>

          <button
            onClick={handleReturn}
            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              text-white
            "
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnAssetModal;
