import React from "react";

export default function HealingSlip({ revenue }) {
  if (!revenue.length) return <p>⚠️ No billing records yet.</p>;
  const tx = revenue[revenue.length - 1];
  const slip = `
🧾 Workflow Healer — Healing Slip
=====================================
Client/User: ${tx.User}
Workflow Healed: ${tx["Healing Type"]}
Cost Billed: $${tx["Cost ($)"]}
Timestamp: ${tx.Timestamp}
✅ Healing completed successfully.
💰 Payment processed via Paywalls.ai
=====================================
`;

  return (
    <div className="card fade-in">
      <h2>🧾 Healing Slip</h2>
      <pre>{slip}</pre>
      <button
        className="btn btn-green"
        onClick={() => {
          const blob = new Blob([slip], { type: "text/plain" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `healing_slip_${Date.now()}.txt`;
          link.click();
        }}
      >
        💾 Download Slip
      </button>
    </div>
  );
}
