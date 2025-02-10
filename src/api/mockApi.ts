import { Transaction, FinancialSummary } from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API error
class ApiError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(1000);
  
  // Simulated API response
  return [
    {
      id: '1',
      date: '2024-03-01',
      description: 'Grocery Store',
      amount: -156.78,
      category: 'Groceries',
      type: 'debit'
    },
    {
      id: '2',
      date: '2024-03-02',
      description: 'Salary Deposit',
      amount: 3500.00,
      category: 'Income',
      type: 'credit'
    },
    {
      id: '3',
      date: '2024-03-03',
      description: 'Restaurant',
      amount: -45.90,
      category: 'Dining',
      type: 'debit'
    },
    {
      id: '4',
      date: '2024-03-04',
      description: 'Rent Payment',
      amount: -1200.00,
      category: 'Housing',
      type: 'debit'
    },
    {
      id: '5',
      date: '2024-03-05',
      description: 'Freelance Payment',
      amount: 800.00,
      category: 'Income',
      type: 'credit'
    }
  ];
}

export async function fetchSummary(): Promise<FinancialSummary> {
  await delay(800);
  
  return {
    totalIncome: 4300.00,
    totalExpenses: 1402.68,
    netBalance: 2897.32,
    transactionCount: 5
  };
}

export async function uploadBankStatement(file: File): Promise<{ message: string }> {
  await delay(1500);
  
  // Validate file type
  if (!file.name.endsWith('.csv')) {
    throw new ApiError('Invalid file format. Please upload a CSV file.', 'INVALID_FORMAT');
  }
  
  // Simulate successful upload
  return { message: 'File uploaded successfully' };
}