import React from "react";

interface InfoItem {
  title: string;
  description: string;
}

const infoList: InfoItem[] = [
  {
    title: "Comprehensive Financial Overview",
    description:
      "Get a snapshot of total income, expenses, net balance, and transaction count, helping users assess their financial status at a glance.",
  },
  {
    title: "Categorized Transactions & Insights",
    description:
      "Track income and expenses with categorized transactions like food, utilities, and shopping, enabling better spending analysis and budgeting.",
  },
  {
    title: "Smart Budgeting & Expense Control",
    description:
      "Identify essential vs. discretionary spending, set budgets, and optimize savings based on spending patterns.",
  },
  {
    title: "User-Friendly Dashboard & CSV Upload",
    description:
      "Easily navigate transaction history, spending insights, and upload bank statements in CSV format for automated analysis.",
  },
  {
    title: "Quick & Automated Analysis",
    description:
      "Simply upload your CSV file, and the tool will instantly analyze, categorize transactions, and provide a financial summary.",
  },
];


const InfoPage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Bank Statement Analyzer: A Smarter Way to Manage Your Finances
      </h1>
      <ul className="space-y-4">
        {infoList.map((item, index) => (
          <li key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              {item.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-400">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoPage;
