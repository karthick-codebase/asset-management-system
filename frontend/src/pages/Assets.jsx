import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import AssetTable from "../components/AssetTable";
import DeleteAssetModal from "../components/DeleteAssetModal.jsx";
import { Link } from "react-router-dom";
const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [Loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/assets?page=${page}&search=${search}&status=${status}`,
      );

      setAssets(res.data.data);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [page, search, status]);

  const openDeleteModal = (id) => {
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  const refreshAfterDelete = () => {
    setShowDeleteModal(false);

    setDeleteId(null);

    fetchAssets();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setAssets(
      assets.filter(
        (item) => search.toLowerCase() === item.asset_name.toLowerCase(),
      ),
    );
    setPage(1);
  };
  if (Loading) {
    return (
      <div className="text-center py-20 text-lg flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" 
        width={250}
        height={100}
        viewBox="0 0 200 200">
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="3"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="3"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="3"
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
            ></animate>
          </circle>
        </svg>
        Loading Assets...
      </div>
    );
  }
  return (
    <div>
      {/* header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Assets Management
            </h1>

            <p className="text-slate-500 mt-1">
              Manage company assets efficiently
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={handleSearch}
              className="
          px-4
          py-3
          border
          border-slate-200
          rounded-xl
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
            />

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="
          px-4
          py-3
          border
          border-slate-200
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
            >
              <option value="">All Status</option>
              <option value="in_stock">Available</option>
              <option value="assigned">Assigned</option>
              <option value="scrapped">Scrapped</option>
            </select>
            <Link to="/assets/create">
              <button
                className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          px-5
          py-3
          rounded-xl
          transition
        "
              >
                + Add Asset
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="mb-8">
        <AssetTable assets={assets} onDelete={openDeleteModal} />
      </div>

      {/* pagination */}
      <div className="flex items-center justify-evenly bg-white rounded-2xl shadow-lg p-4">
        <p className="text-slate-600">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
        px-4
        py-2
        rounded-lg
        border
        disabled:opacity-50
      "
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
        px-4
        py-2
        rounded-lg
        border
        disabled:opacity-50
      "
          >
            Next
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteAssetModal
          closeModal={() => setShowDeleteModal(false)}
          assetId={deleteId}
          afterDelete={refreshAfterDelete}
        />
      )}
    </div>
  );
};

export default Assets;
