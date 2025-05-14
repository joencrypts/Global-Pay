import React from "react";
import { useBudgetCategories, Transaction } from "../hooks/useBudgetCategories";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Example transactions (replace with real data/fetch from blockchain)
const EXAMPLE_TRANSACTIONS: Transaction[] = [
  { hash: "0x1", amount: 50, memo: "Uber ride", timestamp: 1710000000 },
  { hash: "0x2", amount: 1200, memo: "April Rent", timestamp: 1710001000 },
  { hash: "0x3", amount: 30, memo: "Pizza Hut", timestamp: 1710002000 },
  { hash: "0x4", amount: 80, memo: "Amazon shopping", timestamp: 1710003000 },
  { hash: "0x5", amount: 60, memo: "Electric bill", timestamp: 1710004000 },
  { hash: "0x6", amount: 25, memo: "Starbucks coffee", timestamp: 1710005000 },
  { hash: "0x7", amount: 200, memo: "Flight to NYC", timestamp: 1710006000 },
];

const COLORS = [
  "#60a5fa", // blue
  "#fbbf24", // yellow
  "#34d399", // green
  "#f87171", // red
  "#a78bfa", // purple
  "#f472b6", // pink
  "#9ca3af", // gray
];

const BudgetingAssistant: React.FC = () => {
  const { categorized, summary } = useBudgetCategories(EXAMPLE_TRANSACTIONS);

  const chartData = {
    labels: summary.map((s) => s.category),
    datasets: [
      {
        data: summary.map((s) => s.total),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">Smart Budgeting Assistant</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Pie data={chartData} options={{ plugins: { title: { display: true, text: 'Spending by Category', color: '#000' } } }} />
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full text-sm border text-black">
            <thead>
              <tr>
                <th className="border px-2 py-1 text-black">Date</th>
                <th className="border px-2 py-1 text-black">Memo</th>
                <th className="border px-2 py-1 text-black">Amount</th>
                <th className="border px-2 py-1 text-black">Category</th>
              </tr>
            </thead>
            <tbody>
              {categorized.map((tx) => (
                <tr key={tx.hash}>
                  <td className="border px-2 py-1 text-black">{new Date(tx.timestamp * 1000).toLocaleDateString()}</td>
                  <td className="border px-2 py-1 text-black">{tx.memo}</td>
                  <td className="border px-2 py-1 text-black">${tx.amount.toFixed(2)}</td>
                  <td className="border px-2 py-1 text-black">{tx.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetingAssistant; 