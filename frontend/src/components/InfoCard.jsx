import React from "react";

const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
};

export default InfoCard;