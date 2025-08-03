import api, { route } from "@forge/api";

export const handler = async (req) => {
  try {
    const moduleType = req.context?.extension?.type;
    console.log(`Handler triggered by: ${moduleType}`);

    // Only run if this is from the project page
    if (moduleType === "jira:projectPage") {
      const projectIdOrKey =
        req.context.extension.project.key || req.context.extension.project.id;

      console.log(`Using projectIdOrKey: ${projectIdOrKey}`);

      const res = await api.asApp().requestJira(
        route`/rest/api/3/project/${projectIdOrKey}`
      );

      console.log(`Response status: ${res.status}`);

      if (!res.ok) {
        const text = await res.text();
        console.error(`Jira API error (project): ${res.status} ${text}`);
        return { error: `Jira API error: ${res.status}` };
      }

      const data = await res.json();

      console.log(`Project API response: ${JSON.stringify(data, null, 2)}`);

      return {
        key: data.key,
        name: data.name,
        lead: data.lead?.displayName || "No lead assigned",
      };
    }

    // If somehow triggered by another module (shouldn't happen here)
    return { message: "Not a project page call" };
  } catch (err) {
    console.error("Handler error:", err);
    return { error: "Failed to load project info." };
  }
};
