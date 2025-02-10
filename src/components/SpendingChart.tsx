import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlySpending } from "../types";

interface SpendingChartProps {
  data: MonthlySpending[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <div className="h-[400px] w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-all">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* Improved Grid Visibility */}
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" dark:stroke="#4B5563" />

          {/* Updated Axis Colors for Better Readability */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#374151", fontSize: 14, fontWeight: "bold" }}
            stroke="#9CA3AF"
            dark:tick={{ fill: "#D1D5DB", fontSize: 14, fontWeight: "bold" }}
            dark:stroke="#6B7280"
          />
          <YAxis
            tick={{ fill: "#1F2937", fontSize: 14, fontWeight: "bold" }} /* Darker numbers in Light Mode */
            stroke="#9CA3AF"
            dark:tick={{ fill: "#E5E7EB", fontSize: 14, fontWeight: "bold" }} /* Lighter numbers in Dark Mode */
            dark:stroke="#6B7280"
          />

          {/* Improved Tooltip Styling */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#D1D5DB",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            dark:contentStyle={{
              backgroundColor: "#1F2937",
              borderColor: "#4B5563",
              color: "#E5E7EB",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            formatter={(value: number) => [
              <span className="text-gray-900 dark:text-gray-200 font-bold">
                ₹{value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>,
              "Spending",
            ]}
          />

          {/* Improved Bar Color for Light & Dark Modes */}
          <Bar dataKey="amount" fill="#3B82F6" dark:fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
