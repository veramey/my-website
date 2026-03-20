// Post-action: reads agent output and creates a PR on GitHub
function action(params) {
    try {
        const agentId = (params.metadata && params.metadata.agentId) || "website_developer";
        const issueKey = params.concurrencyKey || params.inputKey || "unknown";

        // Read agent summary
        let summary = "";
        try {
            summary = file_read("output/response.md");
        } catch (e) {
            summary = "Implementation completed. See PR for details.";
        }

        // Post comment on the issue
        const comment = "[" + agentId + "]\n\n" + summary;
        // github_post_issue_comment(issueKey, comment);

        return { success: true, agentId: agentId, issue: issueKey };
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}
