import { useState } from "react";
import { List, BarChart3, PieChart } from "lucide-react";

const TABS = ["transactions", "spending", "categories"] as const;
type TabType = (typeof TABS)[number];

export default function Analytics({activeTab , setActiveTab, renderContent}) {



  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-all">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              } flex items-center px-2 sm:px-6 py-4 border-b-2 font-medium text-sm`}
            >
              {tab === "transactions" && <List className="w-5 h-5 mr-2" />}
              {tab === "spending" && <BarChart3 className="w-5 h-5 mr-2" />}
              {tab === "categories" && <PieChart className="w-5 h-5 mr-2" />}
              <span className="capitalize hidden sm:block">{tab}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">{renderContent()}</div>
    </div>
  );
}