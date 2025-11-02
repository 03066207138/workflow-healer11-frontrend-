import React from "react";

export default function Logs({ logs = [], revenue = [] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">💾 Logs & Reports</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg mb-2">🩺 Healing Logs</h3>
          {logs.length ? (
            <ul className="text-sm max-h-96 overflow-y-auto">
              {logs.slice(-30).map((line, i) => (
                <li key={i} className="border-b border-slate-700 py-1">
                  💡 {line}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">📭 No healing logs yet.</p>
          )}
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg mb-2">💰 Revenue Log</h3>
          {revenue.length ? (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-slate-600">
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Cost ($)</th>
                </tr>
              </thead>
              <tbody>
                {revenue.slice(-20).map((row, i) => (
                  <tr key={i} className="border-b border-slate-700">
                    <td>{row.Timestamp}</td>
                    <td>{row.User}</td>
                    <td>{row["Healing Type"]}</td>
                    <td>{row["Cost ($)"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-400">No revenue data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
