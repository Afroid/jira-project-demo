import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

const App = () => {
  const [issueData, setIssueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssueData = async () => {
      try {
        // Call backend handler with type 'issueContext'
        const data = await invoke("handler", { type: "issueContext" });

        if (data.error) {
          setError(data.error);
        } else {
          setIssueData(data);
        }
      } catch (err) {
        console.error("Frontend fetch error:", err);
        setError("Failed to load issue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssueData();
  }, []);

  if (loading) return <p>Loading issue data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "8px", background: "#ffeeba" }}>
      <h3>Issue Context Data</h3>
      <p><strong>Project:</strong> {issueData.name} ({issueData.key})</p>
    </div>
  );
};

export default App;
