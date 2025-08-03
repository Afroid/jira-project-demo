import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import "./index.css";

const App = () => {
  const [issueData, setIssueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssueData = async () => {
      try {
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

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading issue data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        Issue Context Data
      </h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Project:</span> {issueData.name} ({issueData.key})
        </p>
        {issueData.summary && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Summary:</span> {issueData.summary}
          </p>
        )}
        {issueData.status && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Status:</span> {issueData.status}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
