import React, { useEffect, useState } from "react";
import API from "../services/api";
import { FaHistory, FaUser, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/history?page=${page}`);

      setHistory(res.data.data);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const filteredHistory = history.filter((item) => {
    if (filter === "all") return true;

    return item.action === filter;
  });

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
        Loading History...
      </div>
    );
  }

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

                <div className="bg-slate-50 rounded-2xl border p-5 flex-1 capitalize">
                  <div className="flex justify-between ">
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

                      {item.Asset?.asset_name ||"Deleted"}
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
    </div>
  );
};

export default History;
