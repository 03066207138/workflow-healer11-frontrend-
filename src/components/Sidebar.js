import React from "react";

export default function Sidebar({ tab, setTab, health }) {
  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "logs", label: "💾 Logs & Reports" },
    { id: "slip", label: "🧾 Healing Slips" },
    { id: "tickets", label: "🎟️ Tickets" },
    { id: "controls", label: "⚙️ Controls" },
  ];

  return (
    <aside className="w-64 bg-slate-800 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">💰 Workflow Healer</h2>
      <p className="text-sm mb-4 text-slate-400">
        Mode: {health.mode || "Offline"}
      </p>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`w-full text-left px-3 py-2 mb-2 rounded-lg ${
            tab === t.id
              ? "bg-blue-600 text-white"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {t.label}
        </button>
      ))}
    </aside>
  );
}
