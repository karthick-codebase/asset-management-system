import React, { useState } from "react";
import API from "../services/api";

const ScrapAssetModal = ({ closeModal, assetId, refreshAsset }) => {
  const [reason, setReason] = useState("");

  const handleScrap = async () => {
    const confirmScrap = window.confirm(
      "Are you sure you want to scrap this asset?",
    );

    if (!confirmScrap) {
      return;
    }

    try {
      await API.put("/assets/scrap", {
        assetId,

        reason: reason || "Asset scrapped",
      });

      await refreshAsset();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
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
          text-red-600
          mb-5
          "
        >
          Scrap Asset
        </h2>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for scrapping..."
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
            onClick={handleScrap}
            className="
            px-5
            py-2
            rounded-xl
            bg-red-600
            text-white
            hover:bg-red-700
            "
          >
            Scrap
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrapAssetModal;
