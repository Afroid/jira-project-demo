import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import "./index.css";

function App() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await invoke("handler", { type: "projectPage" });

        if (data.error) {
          setError(data.error);
        } else {
          setProject(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load project info.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading project info...
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
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        {project.name} <span className="text-gray-500">({project.key})</span>
      </h2>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Project Lead:</span> {project.lead}
      </p>
    </div>
  );
}

export default App;
