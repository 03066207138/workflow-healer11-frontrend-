import React from "react";
import { api } from "../utils/api";

export default function Controls() {
  const handleAction = async (path) => {
    try {
      await api.post(path);
      alert("✅ Action executed: " + path);
    } catch {
      alert("❌ Failed: " + path);
    }
  };

  return (
    <div className="controls">
  <button className="btn-green" onClick={() => handleAction("/sim/start")}>🚀 Start Simulation</button>
  <button className="btn-red" onClick={() => handleAction("/sim/stop")}>🧊 Stop Simulation</button>
  <button onClick={() => handleAction("/simulate?event=workflow_delay")}>💥 Run Healing</button>
</div>

  );
}
