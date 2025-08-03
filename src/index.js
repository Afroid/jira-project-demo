import api, { route } from "@forge/api";

export const handler = async (req) => {
  try {
    const moduleType = req.context?.extension?.type;

    // ----------------------------
    // Project Page handler
    // ----------------------------
    if (moduleType === "jira:projectPage") {
      const projectIdOrKey =
        req.context.extension.project.key || req.context.extension.project.id;

      const res = await api.asApp().requestJira(
        route`/rest/api/3/project/${projectIdOrKey}`
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Jira API error (project): ${res.status} ${text}`);
      }

      const data = await res.json();

      return {
        key: data.key,
        name: data.name,
        lead: data.lead?.displayName || "No lead assigned",
      };
    }

    // ----------------------------
    // Issue Context handler
    // ----------------------------
    if (moduleType === "jira:issueContext") {
      // Verify if issue data exists in context
      const issueIdOrKey =
        req.context.extension.issue?.key || req.context.extension.issue?.id;

      if (!issueIdOrKey) {
        console.error("No issue key or ID in context for issueContext.");
        return { error: "No issue key available in context." };
      }

      const res = await api.asApp().requestJira(
        route`/rest/api/3/issue/${issueIdOrKey}`
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Jira API error (issue): ${res.status} ${text}`);
      }

      const data = await res.json();

      return {
        key: data.key,
        summary: data.fields.summary,
        status: data.fields.status?.name || "Unknown",
        reporter: data.fields.reporter?.displayName || "Unknown reporter",
      };
    }

    // ----------------------------
    // Fallback for unknown module types
    // ----------------------------
    console.warn(`Unknown module type: ${moduleType}`);
    return { error: `Unknown module type: ${moduleType}` };

  } catch (err) {
    console.error("Handler error:", err);
    return { error: "Failed to load data." };
  }
};
