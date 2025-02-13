import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BarChart3, PieChart, List, Loader2, AlertCircle } from "lucide-react";
import { TransactionList } from "./components/TransactionList";
import { SpendingChart } from "./components/SpendingChart";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { FileUpload } from "./components/FileUpload";
import { SummaryMetrics } from "./components/SummaryMetrics";
import ThemeToggle from "./components/ThemeToggle";
import SidebarMenu from "./components/menu";
import Analytics from "./components/Analytics";
import InfoItem from "./components/Help";

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
  const response = await fetch("/data/transactions.json");
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};

export const fetchSummary = async (): Promise<FinancialSummary> => {
  const response = await fetch("/data/summary.json");
  if (!response.ok) throw new Error("Failed to fetch summary");
  return response.json();
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"transactions" | "spending" | "categories">("transactions");
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
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Main Content */}
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-all">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 flex justify-between items-center">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                📉📈 Bank Statement Analyzer
              </h1>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Section */}
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              {/* File Upload Route */}
              <Route
                path="/fileUpload"
                element={
                  <div className="mb-8">
                    <FileUpload
                      onUploadSuccess={handleUploadSuccess}
                      onUploadError={handleUploadError}
                    />
                  </div>
                }
              />

              {/* Home Route */}
              <Route
                path="/"
                element={
                  <>
                    {summary ? <SummaryMetrics summary={summary} /> : <p>No summary available</p>}
                    <Analytics activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
                  </>
                }
              />

              {/* Info Route */}
              <Route
                path="/help"
                element={
                  <>
                    <InfoItem />
                  </>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
