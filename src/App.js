import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Logs from "./components/Logs";
import HealingSlip from "./components/HealingSlip";
import Tickets from "./components/Tickets";
import Controls from "./components/Controls";
import { api } from "./utils/api";
import "./index.css";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [metrics, setMetrics] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [logs, setLogs] = useState([]);
  const [health, setHealth] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [paywallsActive, setPaywallsActive] = useState(false);
  const [flowxoActive, setFlowxoActive] = useState(false);
  const [mode, setMode] = useState("Groq Local AI");

  // Fetch backend data
  const fetchData = async () => {
    try {
      const [m, r, l, h] = await Promise.all([
        api.get("/metrics/summary"),
        api.get("/metrics/revenue"),
        api.get("/healing/logs?n=50"),
        api.get("/health"),
      ]);

      setMetrics(m.data || {});
      setRevenue(r.data.logs || []);
      setLogs(l.data.logs || []);
      setHealth(h.data || {});

      // Paywalls / FlowXO / Groq status
      setPaywallsActive(h.data?.paywalls_ready || false);
      setFlowxoActive(h.data?.flowxo_ready || false);
      setMode(h.data?.mode || "Groq Local AI");

      // Calculate total revenue (frontend aggregation)
      if (r.data && r.data.logs) {
        const total = r.data.logs.reduce(
          (sum, log) => sum + (parseFloat(log["Cost ($)"]) || 0),
          0
        );
        setTotalRevenue(total);
      }
    } catch (err) {
      console.error("❌ Error fetching backend data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app fade-in">
      <Navbar
        tab={tab}
        setTab={setTab}
        mode={mode}
        paywallsActive={paywallsActive}
        flowxoActive={flowxoActive}
        totalRevenue={totalRevenue}
      />

      <main className="main">
        {tab === "dashboard" && (
          <Dashboard metrics={metrics} revenue={revenue} totalRevenue={totalRevenue} />
        )}
        {tab === "logs" && <Logs logs={logs} revenue={revenue} />}
        {tab === "slip" && <HealingSlip revenue={revenue} />}
        {tab === "tickets" && <Tickets />}
        {tab === "controls" && <Controls />}
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Workflow Healer — Powered by{" "}
        <b>Groq AI × Paywalls.ai × FlowXO</b> | Built by <b>Saher Pervaiz & Malaika Basharat</b>
      </footer>
    </div>
  );
}
