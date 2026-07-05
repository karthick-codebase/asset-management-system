import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaUser,
  FaHistory,
  FaArrowRight,
  FaUndo,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useParams, useNavigate, Await } from "react-router-dom";
import API from "../services/api";
import InfoCard from "../components/InfoCard";
import AssignAssetModal from "../components/AssignAssetModal";
import ReturnAssetModal from "../components/ReturnAssetModal";
import ScrapAssetModal from "../components/ScrapAssetModal";
import DeleteAssetModal from "../components/DeleteAssetModal";

const AssetDetails = () => {
  const [asset, setAsset] = useState(null);
  const [history, setHistory] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showScrapModal, setShowScrapModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchAsset = async () => {
    try {
      const res = await API.get(`/assets/${id}`);
      setAsset(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchHistory = async () => {
    try {
      const res = await API.get(`/history/asset/${id}`);
      setHistory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAsset();
    fetchHistory();
  }, []);
  
  /* 
  const handleDelete = async () => {
    try {
      const isDelete = window.confirm("Are You Sure To delete This Assets");
      if (isDelete) {
        await API.delete(`/assets/${id}`);
        navigate("/assets");
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  const getStatusBadge = (status) => {
    switch (status) {
      case "assigned":
        return (
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            Assigned
          </span>
        );

      case "scrapped":
        return (
          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
            Scrapped
          </span>
        );

      case "in_stock":
        return (
          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            In Stock
          </span>
        );

      default:
        return (
          <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
            {status}
          </span>
        );
    }
  };

  if (!asset) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-500">Loading asset...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto p-6 space-y-6"
    >
      {/* Hero */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row justify-between gap-5 md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-2xl">
                <FaBoxOpen size={28} />
              </div>

              <h1 className="text-3xl font-bold">{asset.asset_name}</h1>
            </div>

            <p className="mt-3 text-blue-100">Asset ID : {asset.asset_id}</p>

            <p className="text-blue-100">
              {asset.make} {asset.model}
            </p>
          </div>

          {getStatusBadge(asset.status)}
        </div>
      </motion.div>

      {/* Information */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaBoxOpen className="text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Asset Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard label="Asset ID" value={asset.asset_id} />

            <InfoCard label="Serial Number" value={asset.serial_number} />

            <InfoCard label="Category" value={asset.Category?.name} />

            <InfoCard label="Make" value={asset.make} />

            <InfoCard label="Model" value={asset.model} />

            <InfoCard label="Branch" value={asset.branch} />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-green-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Assigned Employee
            </h2>
          </div>

          {asset.Employee ? (
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard label="Name" value={asset.Employee.name} />

              <InfoCard
                label="Employee ID"
                value={asset.Employee.employee_id}
              />

              <InfoCard label="Department" value={asset.Employee.department} />

              <InfoCard label="Email" value={asset.Employee.email} />

              <InfoCard label="Phone" value={asset.Employee.phone} />

              <InfoCard label="Branch" value={asset.Employee.branch} />
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500">
              No employee assigned
            </div>
          )}
        </motion.div>
      </div>

      {/* History */}

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaHistory className="text-purple-600" />

          <h2 className="text-2xl font-bold text-slate-800">
            History Timeline
          </h2>
        </div>

        <div className="space-y-6">
          {history.map((item, index) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600"></div>

                {index !== history.length - 1 && (
                  <div className="w-1 flex-1 bg-slate-200"></div>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold capitalize">{item.action}</h3>

                  <span className="text-sm text-slate-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-slate-600 mt-2">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between bg-white  shadow-lg rounded-3xl"
      >
        {/* Actions */}
        <div className="rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-5">Actions</h2>

          <div className="flex flex-wrap gap-4">
            {asset.status === "scrapped" && (
              <div className="text-red-600 font-bold text-2xl ml-6">
                <p>The Assets Is already Scrapped</p>
              </div>
            )}
            {asset.status === "in_stock" && (
              <button
                onClick={() => setShowAssignModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
              >
                <FaArrowRight />
                Assign
              </button>
            )}

            {asset.status === "assigned" && (
              <button
                onClick={() => setShowReturnModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaUndo />
                Return
              </button>
            )}

            {asset.status !== "scrapped" && (
              <button
                onClick={() => setShowScrapModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                <FaTrash />
                Scrap
              </button>
            )}
          </div>
        </div>

        {/* Management Actions */}

        <div className=" rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Management Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate(`/assets/edit/${asset.id}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              <FaEdit />
              Edit
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {showAssignModal && (
        <AssignAssetModal
          closeModal={() => setShowAssignModal(false)}
          assetId={asset.id}
          refreshAsset={fetchAsset}
        />
      )}

      {showReturnModal && (
        <ReturnAssetModal
          closeModal={() => setShowReturnModal(false)}
          assetId={asset.id}
          refreshAsset={fetchAsset}
        />
      )}

      {showScrapModal && (
        <ScrapAssetModal
          closeModal={() => setShowScrapModal(false)}
          assetId={asset.id}
          refreshAsset={fetchAsset}
        />
      )}
      {showDeleteModal && (
        <DeleteAssetModal
          closeModal={() => setShowDeleteModal(false)}
          assetId={asset.id}
          afterDelete={() => navigate("/assets")}
        />
      )}
    </motion.div>
  );
};

export default AssetDetails;
