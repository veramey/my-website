// Post-action: merges approved PRs and comments on linked issues
function action(params) {
    try {
        let summary = "";
        try {
            summary = file_read("output/response.md");
        } catch (e) {
            summary = "Merge trigger completed.";
        }

        return { success: true, summary: summary };
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}
