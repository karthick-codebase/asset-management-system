import React, { useEffect, useState } from "react";
import API from "../services/api";
import { FaHistory, FaUser, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";

const History = () => {
  const [history, setHistory] = useState([]);

  const [filter, setFilter] = useState("all");

  const fetchHistory = async () => {
    try {
      const res = await API.get("/history");

      setHistory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    if (filter === "all") return true;

    return item.action === filter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3">
          <FaHistory className="text-purple-600 text-2xl" />

          <h1 className="text-3xl font-bold text-slate-800">Asset History</h1>
        </div>

        <p className="text-slate-500 mt-2">
          Track asset assigned, returned and scrapped history
        </p>
      </div>

      {/* Filter */}

      <div className="bg-white rounded-3xl shadow-lg p-5">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-xl ${
              filter === "all" ? "bg-slate-800 text-white" : "bg-slate-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("assigned")}
            className={`px-5 py-2 rounded-xl ${
              filter === "assigned" ? "bg-blue-600 text-white" : "bg-slate-100"
            }`}
          >
            Assigned
          </button>

          <button
            onClick={() => setFilter("returned")}
            className={`px-5 py-2 rounded-xl ${
              filter === "returned" ? "bg-green-600 text-white" : "bg-slate-100"
            }`}
          >
            Returned
          </button>

          <button
            onClick={() => setFilter("scrapped")}
            className={`px-5 py-2 rounded-xl ${
              filter === "scrapped" ? "bg-red-600 text-white" : "bg-slate-100"
            }`}
          >
            Scrapped
          </button>
        </div>
      </div>

      {/* Timeline */}

      <div className="bg-white rounded-3xl shadow-lg p-8">
        {filteredHistory.length === 0 ? (
          <div className="text-center text-slate-500">No records found</div>
        ) : (
          <div className="space-y-8">
            {filteredHistory.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 26, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                whileHover={{ y: 8 }}
                key={item.id}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      item.action === "assigned"
                        ? "bg-blue-600"
                        : item.action === "returned"
                          ? "bg-green-600"
                          : "bg-red-600"
                    }`}
                  />

                  {index !== filteredHistory.length - 1 && (
                    <div className="w-1 flex-1 bg-slate-200 mt-2"></div>
                  )}
                </div>

                <div className="bg-slate-50 rounded-2xl border p-5 flex-1">
                  <div className="flex justify-between">
                    <h2 className="font-bold text-xl capitalize">
                      {item.action}
                    </h2>

                    <span className="text-sm text-slate-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-slate-600 mt-3">{item.reason}</p>

                  <div className="flex gap-8 mt-5 text-sm">
                    <div className="flex items-center gap-2">
                      <FaBox className="text-blue-600" />

                      {item.Asset?.asset_name}
                    </div>

                    <div className="flex items-center gap-2">
                      <FaUser className="text-green-600" />

                      {item.Employee?.name || "No employee"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
