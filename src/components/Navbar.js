import React from "react";

export default function Navbar({
  tab,
  setTab,
  mode,
  paywallsActive,
  flowxoActive,
  totalRevenue,
}) {
  return (
    <nav className="navbar">
      <div className="logo">💎 Workflow Healer</div>
      <div className="status">
        <span className="mode">🧠 {mode}</span> |
        <span className={paywallsActive ? "ok" : "fail"}>
          💰 Paywalls.ai {paywallsActive ? "Active" : "Offline"}
        </span>{" "}
        |
        <span className={flowxoActive ? "ok" : "fail"}>
          🌐 FlowXO {flowxoActive ? "Connected" : "Disconnected"}
        </span>{" "}
        | <b>Total Revenue:</b> ${totalRevenue.toFixed(3)}
      </div>
      <div className="nav-links">
        <button onClick={() => setTab("dashboard")}>📊 Dashboard</button>
        <button onClick={() => setTab("logs")}>📘 Logs</button>
        <button onClick={() => setTab("slip")}>🧾 Healing Slip</button>
        <button onClick={() => setTab("tickets")}>🎟️ Tickets</button>
        <button onClick={() => setTab("controls")}>⚙️ Controls</button>
      </div>
    </nav>
  );
}
