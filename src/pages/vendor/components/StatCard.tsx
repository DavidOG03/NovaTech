import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="bg-grey rounded-xl shadow-sm border border-light-black/25 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} p-3 rounded-3xl text-white`}>
          {icon}
        </div>
      </div>
      <h3 className="text-light-black text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-light-black">{value}</p>
    </div>
  );
};

export default StatCard;
