import React from "react";

const SalesOverview: React.FC = () => {
  return (
    <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-dim/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-muted">Sales Overview</h2>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 text-sm bg-accent-light text-white rounded-3xl font-medium">
            Week
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 rounded-3xl font-medium hover:bg-gray-100">
            Month
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 rounded-3xl font-medium hover:bg-gray-100">
            Year
          </button>
        </div>
      </div>

      {/* Simple Chart Placeholder */}
      <div className="h-64 flex items-end justify-between space-x-2">
        {[65, 45, 75, 55, 80, 60, 90].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center space-y-2">
            <div
              className="w-full bg-linear-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-accent-light hover:to-blue-500 cursor-pointer"
              style={{ height: `${height}%` }}
            />
            <span className="text-xs text-dim font-medium">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverview;
