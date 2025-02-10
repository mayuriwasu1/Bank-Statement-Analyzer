import React, { useState, useEffect } from "react";
import { BarChart3, PieChart, List, Loader2, AlertCircle } from "lucide-react";
import { TransactionList } from "./components/TransactionList";
import { SpendingChart } from "./components/SpendingChart";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { FileUpload } from "./components/FileUpload";
import { SummaryMetrics } from "./components/SummaryMetrics";
import Loader from "./components/Loader";
import ThemeToggle from "./components/ThemeToggle";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  percentage: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  transactionCount: number;
  categoryBreakdown: CategorySummary[];
  monthlySpending: MonthlySpending[];
}

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch("data/transactions.json");
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};

export const fetchSummary = async (): Promise<FinancialSummary> => {
  const response = await fetch("/data/summary.json");
  if (!response.ok) throw new Error("Failed to fetch summary");
  return response.json();
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"transactions" | "spending" | "categories">(
    "transactions"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [transactionsData, summaryData] = await Promise.all([
        fetchTransactions(),
        fetchSummary(),
      ]);
      setTransactions(transactionsData);
      setSummary(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadSuccess = () => {
    fetchData();
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64 text-red-500">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>{error}</span>
        </div>
      );
    }

    switch (activeTab) {
      case "transactions":
        return <TransactionList transactions={transactions} />;
      case "spending":
        return <SpendingChart data={summary?.monthlySpending ?? []} />;
      case "categories":
        return <CategoryBreakdown data={summary?.categoryBreakdown ?? []} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-all">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            📉📈 Bank Statement Analyzer
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <FileUpload onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
        </div>

        {summary && (
          <div className="mb-8">
            <SummaryMetrics summary={summary} />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-all">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {["transactions", "spending", "categories"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "transactions" | "spending" | "categories")}
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
      </main>
    </div>
  );
};

export default App;
