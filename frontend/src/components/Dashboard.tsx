import React from "react";
import BudgetingAssistant from "./BudgetingAssistant";

// Placeholder data
const totalBalance = 1645.25;
const recentTransactions = [
  { hash: "0x1", amount: 50, memo: "Uber ride", timestamp: 1710000000 },
  { hash: "0x2", amount: 1200, memo: "April Rent", timestamp: 1710001000 },
  { hash: "0x3", amount: 30, memo: "Pizza Hut", timestamp: 1710002000 },
  { hash: "0x4", amount: 80, memo: "Amazon shopping", timestamp: 1710003000 },
];

const quickActions = [
  { label: "Send", icon: "📤", onClick: () => alert("Send action") },
  { label: "Receive", icon: "📥", onClick: () => alert("Receive action") },
  { label: "Swap", icon: "🔄", onClick: () => alert("Swap action") },
  { label: "Buy", icon: "💳", onClick: () => alert("Buy action") },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold mb-2">Total Balance</div>
          <div className="text-4xl font-bold mb-1">${totalBalance.toLocaleString()}</div>
          <div className="text-sm opacity-80">Across all stablecoins</div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
        <div className="text-lg text-black font-semibold mb-4">Quick Actions</div>
        <div className="flex flex-wrap gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex flex-col items-center bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg px-4 py-2 transition"
            >
              <span className="text-2xl mb-1">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
        <div className="text-lg text-black font-semibold mb-4">Recent Transactions</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-black">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-middle">Memo</th>
                <th className="px-2 py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.hash} className="border-b last:border-0">
                  <td className="px-2 py-1 text-left">{new Date(tx.timestamp * 1000).toLocaleDateString()}</td>
                  <td className="px-2 py-1">{tx.memo}</td>
                  <td className="px-2 py-1 text-right">${tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Insights Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
        <div className="text-lg text-black font-semibold mb-4">Budget Insights</div>
        <BudgetingAssistant />
      </div>
    </div>
  );
};

export default Dashboard; 