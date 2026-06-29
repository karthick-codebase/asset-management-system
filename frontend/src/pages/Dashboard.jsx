import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaLaptop,
  FaUserTie,
  FaTags,
  FaCheckCircle,
  FaBoxOpen,
  FaTrashAlt,
} from "react-icons/fa";

import StatsCard from "../components/StatsCard";
import API from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchActivities();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchActivities = async () => {
    try {
      const res = await API.get("/history");

      setActivities(res.data.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <div className="text-center py-20 text-lg">Loading Dashboard...</div>
    );
  }

  const lastAssigned = activities.find((item) => item.action === "assigned");

  const lastReturned = activities.find((item) => item.action === "returned");

  const lastScrapped = activities.find((item) => item.action === "scrapped");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-slate-500 mt-1">Asset Management Overview</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Assets"
          value={stats.totalAssets}
          icon={<FaLaptop />}
          gradient="bg-gradient-to-r from-blue-600 to-indigo-700"
        />

        <StatsCard
          title="Assigned Assets"
          value={stats.assignedAssets}
          icon={<FaCheckCircle />}
          gradient="bg-gradient-to-r from-green-500 to-emerald-700"
        />

        <StatsCard
          title="Available Assets"
          value={stats.availableAssets}
          icon={<FaBoxOpen />}
          gradient="bg-gradient-to-r from-cyan-500 to-sky-700"
        />

        <StatsCard
          title="Scrapped Assets"
          value={stats.scrappedAssets}
          icon={<FaTrashAlt />}
          gradient="bg-gradient-to-r from-red-500 to-rose-700"
        />

        <StatsCard
          title="Employees"
          value={stats.totalEmployees}
          icon={<FaUserTie />}
          gradient="bg-gradient-to-r from-purple-500 to-violet-700"
        />

        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          icon={<FaTags />}
          gradient="bg-gradient-to-r from-orange-500 to-amber-700"
        />
      </div>

      {/* recent activities */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Asset Activity</h2>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {activity.Asset?.asset_name}
                </p>

                <p className="text-sm text-slate-500">{activity.reason}</p>
              </div>

              <div className="text-right">
                <span
                  className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                activity.action === "assigned"
                  ? "bg-green-100 text-green-700"
                  : activity.action === "returned"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }
            `}
                >
                  {activity.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* recent summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Assigned */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-green-600 mb-3">Last Assigned</h3>

          {lastAssigned ? (
            <>
              <p className="font-medium">{lastAssigned.Asset?.asset_name}</p>

              <p className="text-sm text-slate-500">
                {lastAssigned.Employee?.name}
              </p>
            </>
          ) : (
            <p className="text-slate-400">No record found</p>
          )}
        </motion.div>

        {/* Returned */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-yellow-600 mb-3">Last Returned</h3>

          {lastReturned ? (
            <>
              <p className="font-medium">{lastReturned.Asset?.asset_name}</p>

              <p className="text-sm text-slate-500">
                {lastReturned.Employee?.name}
              </p>
            </>
          ) : (
            <p className="text-slate-400">No record found</p>
          )}
        </motion.div>

        {/* Scrapped */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-red-600 mb-3">Last Scrapped</h3>

          {lastScrapped ? (
            <>
              <p className="font-medium">{lastScrapped.Asset?.asset_name}</p>

              <p className="text-sm text-slate-500">Asset Removed</p>
            </>
          ) : (
            <p className="text-slate-400">No record found</p>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg mb-2">Add Asset</h3>

            <p className="text-slate-500 text-sm mb-4">
              Register a new company asset.
            </p>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Link to={"assets/create"}>Add Asset</Link>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg mb-2">Add Employee</h3>

            <p className="text-slate-500 text-sm mb-4">
              Create a new employee record.
            </p>

            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              <Link to={"employees/create"}>Add Employee</Link>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg mb-2">View History</h3>

            <p className="text-slate-500 text-sm mb-4">
              Check assignment and return logs.
            </p>

            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              <Link to={"history"}> View History</Link>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
