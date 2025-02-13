import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { CategorySummary } from "../types";

interface CategoryBreakdownProps {
  data: CategorySummary[];
}

const LIGHT_COLORS = [
  "#273236",
  "#455A68",
  "#5065F5",
  "#3344AD",
  "#4D61FC",
  "#151980",
];
const DARK_COLORS = [
  "#B0C4DE",
  "#ADD8E6",
  "#87CEEB",
  "#4682B4",
  "#4169E1",
  "#191970",
];

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="h-[300px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-all">
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={
                  isDarkMode
                    ? DARK_COLORS[index % DARK_COLORS.length]
                    : LIGHT_COLORS[index % LIGHT_COLORS.length]
                }
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              borderColor: "var(--tooltip-border)",
              color: "var(--tooltip-text)",
            }}
            formatter={(value: number) => [
              `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
              "Total",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((category, index) => (
          <div key={category.category} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: isDarkMode
                  ? DARK_COLORS[index % DARK_COLORS.length]
                  : LIGHT_COLORS[index % LIGHT_COLORS.length],
              }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {category.category} ({category.percentage.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
