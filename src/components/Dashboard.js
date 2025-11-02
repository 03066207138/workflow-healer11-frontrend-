import React, { useEffect, useState } from "react";

export default function Dashboard({ metrics, revenue }) {
  const healings = metrics.healings || 0;
  const avgRecovery = metrics.avg_recovery_pct || 0;

  // local state for dynamic updates
  const [avgReward, setAvgReward] = useState(metrics.avg_reward || 0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // ⏩ Recalculate total revenue & avg reward whenever new revenue arrives
    if (revenue && revenue.length > 0) {
      let total = 0;
      let rewardSum = 0;
      let rewardCount = 0;

      revenue.forEach((item) => {
        const cost = parseFloat(item["Cost ($)"]) || 0;
        total += cost;

        // if backend writes reward in the same object, use it; else estimate
        const reward = parseFloat(item.reward || 0);
        if (reward > 0) {
          rewardSum += reward;
          rewardCount++;
        }
      });

      setTotalRevenue(total);

      // prefer live backend reward metric if available
      if (metrics.avg_reward && metrics.avg_reward > 0) {
        setAvgReward(metrics.avg_reward);
      } else {
        // otherwise compute average from log data
        setAvgReward(rewardCount > 0 ? rewardSum / rewardCount : avgReward);
      }
    } else {
      setTotalRevenue(0);
      setAvgReward(metrics.avg_reward || 0);
    }
  }, [revenue, metrics]);

  return (
    <div className="card fade-in">
      <h2>⚡ Healing & Monetization KPIs</h2>

      <div className="metrics">
        <div className="metric">
          🩺 Healings
          <br />
          <b>{healings}</b>
        </div>
        <div className="metric">
          ⚙️ Recovery %
          <br />
          <b>{avgRecovery.toFixed(2)}</b>
        </div>
        <div className="metric">
          🎯 Reward
          <br />
          <b>{avgReward.toFixed(2)}</b>
        </div>
        <div className="metric">
          💰 Revenue ($)
          <br />
          <b>{totalRevenue.toFixed(2)}</b>
        </div>
      </div>

      <h3>🚨 Latest Healing Alert</h3>
      {revenue && revenue.length > 0 ? (
        <div className="alert">
          <p>
            💸 <b>{revenue[revenue.length - 1].User}</b> healed workflow{" "}
            <b>{revenue[revenue.length - 1]["Healing Type"]}</b>
          </p>
          <p>
            Cost: $
            {parseFloat(revenue[revenue.length - 1]["Cost ($)"] || 0).toFixed(2)}
          </p>
        </div>
      ) : (
        <p>No healing events yet — start simulation to generate data.</p>
      )}
    </div>
  );
}
