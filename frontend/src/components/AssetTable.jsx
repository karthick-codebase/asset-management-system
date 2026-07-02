import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AssetTable = ({ assets, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        {assets.lenght > 0 ? (
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left px-6 py-4">Asset Name</th>

                <th className="text-left px-6 py-4">Asset ID</th>

                <th className="text-left px-6 py-4">Category</th>

                <th className="text-left px-6 py-4">Employee</th>

                <th className="text-left px-6 py-4">Status</th>

                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {asset.asset_name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{asset.asset_id}</td>

                  <td className="px-6 py-4 text-slate-600">
                    {asset.Category?.name || "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {asset.Employee?.name || "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    
                    ${
                      asset.status === "assigned"
                        ? "bg-blue-100 text-blue-700"
                        : asset.status === "scrapped"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                    }

                    `}
                    >
                      {asset.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      {/* View */}

                      <button
                        onClick={() => navigate(`/assets/${asset.id}`)}
                        className="
                      p-3
                      rounded-xl
                      bg-blue-100
                      text-blue-700
                      hover:bg-blue-200
                      transition
                      "
                      >
                        <FaEye />
                      </button>

                      {/* Edit */}

                      <button
                        onClick={() => navigate(`/assets/edit/${asset.id}`)}
                        className="
                      p-3
                      rounded-xl
                      bg-yellow-100
                      text-yellow-700
                      hover:bg-yellow-200
                      transition
                      "
                      >
                        <FaEdit />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => onDelete(asset.id)}
                        className="
                      p-3
                      rounded-xl
                      bg-red-100
                      text-red-700
                      hover:bg-red-200
                      transition
                      "
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-white shadow-lg p-5 text-center text-3xl text-red-500 font-bold text-nowrap w-full">
            The Assets are Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetTable;
