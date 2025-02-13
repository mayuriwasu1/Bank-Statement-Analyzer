import React from "react";
import { IndianRupee, TrendingUp, TrendingDown, FileText } from "lucide-react";
import type { FinancialSummary } from "../types";

interface SummaryMetricsProps {
  summary: FinancialSummary;
}

export function SummaryMetrics({ summary }: SummaryMetricsProps) {
  const metrics = [
    {
      label: "Total Income",
      value: summary.totalIncome,
      icon: IndianRupee,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900",
    },
    {
      label: "Total Expenses",
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900",
    },
    {
      label: "Net Balance",
      value: summary.netBalance,
      icon: TrendingUp,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900",
    },
    {
      label: "Transactions",
      value: summary.transactionCount,
      icon: FileText,
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900",
      isCount: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className={`${metric.bgColor} rounded-lg p-3`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {metric.label}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {metric.isCount
                  ? metric.value
                  : `₹${Math.abs(metric.value).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
