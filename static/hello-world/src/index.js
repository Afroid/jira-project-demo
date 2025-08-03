import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { invoke } from "@forge/bridge";

const App = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        // Call backend handler and specify we want projectPage data
        const data = await invoke("handler", { type: "projectPage" });

        if (data.error) {
          setError(data.error);
        } else {
          setProject(data);
        }
      } catch (err) {
        console.error("Frontend fetch error:", err);
        setError("Failed to load project info.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectInfo();
  }, []);

  if (loading) return <p>Loading project info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "8px" }}>
      <h2>Custom Project Page</h2>
      <h3>
        {project.name} ({project.key})
      </h3>
      <p>
        <strong>Project Lead:</strong> {project.lead}
      </p>
    </div>
  );
};

render(<App />, document.getElementById("root"));
