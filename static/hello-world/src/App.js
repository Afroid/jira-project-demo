import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

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

  if (loading) return <p>Loading project info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "8px" }}>
      <h2>
        {project.name} ({project.key})
      </h2>
      <p>
        <strong>Project Lead:</strong> {project.lead}
      </p>
    </div>
  );
}

export default App;
