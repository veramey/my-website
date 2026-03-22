The user wants to trigger the AI Teammate workflow for a specific GitHub issue.

Extract the issue number from the user's message (e.g. "/trigger-issue 5" → issue number is 5).

Then run:

```bash
gh workflow run ai-teammate.yml \
  --repo veramey/my-website \
  --field issue_number=ISSUE_NUMBER
```

Replace ISSUE_NUMBER with the extracted number.

After triggering, run:
```bash
sleep 5 && gh run list --repo veramey/my-website --workflow "AI Teammate" --limit 3 \
  --json databaseId,name,status,createdAt \
  --jq '.[] | "\(.databaseId) \(.name) \(.status) \(.createdAt)"'
```

Confirm to the user that the workflow was triggered and show the run URL.
