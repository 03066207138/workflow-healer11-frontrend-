import React, { useState, useEffect } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tickets");
    if (saved) setTickets(JSON.parse(saved));
  }, []);

  const handleSubmit = () => {
    const newTicket = {
      id: `TCKT-${Date.now()}`,
      issue: issue || "Unnamed Issue",
      details: details || "No details",
      timestamp: new Date().toISOString(),
      status: "Open",
    };
    const updated = [...tickets, newTicket];
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    setIssue("");
    setDetails("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎟️ Support Tickets</h2>

      <div className="bg-slate-800 p-4 rounded-lg mb-4">
        <input
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Issue Title"
          className="w-full mb-2 p-2 rounded bg-slate-700 text-white"
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Describe the issue..."
          className="w-full p-2 rounded bg-slate-700 text-white h-24"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
        >
          🧾 Create Ticket
        </button>
      </div>

      <h3 className="text-lg mb-2">📋 All Tickets</h3>
      {tickets.length ? (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-600">
              <th>ID</th><th>Issue</th><th>Status</th><th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, i) => (
              <tr key={i} className="border-b border-slate-700">
                <td>{t.id}</td>
                <td>{t.issue}</td>
                <td>{t.status}</td>
                <td>{t.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-slate-400">✅ No tickets yet.</p>
      )}
    </div>
  );
}
