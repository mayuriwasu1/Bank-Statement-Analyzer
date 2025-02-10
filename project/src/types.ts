export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'credit' | 'debit';
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
}

export interface ApiError {
  message: string;
  code?: string;
}