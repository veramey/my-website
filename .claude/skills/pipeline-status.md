Run the following bash commands to show the current state of the dark factory pipeline for the veramey/my-website repo:

```bash
echo "=== OPEN ISSUES ===" && \
gh issue list --repo veramey/my-website --state open \
  --json number,title,labels \
  --jq '.[] | "\(.number) \(.title) [\([.labels[].name] | join(", "))]"'

echo "" && echo "=== OPEN PRs ===" && \
gh pr list --repo veramey/my-website --state open \
  --json number,title,headRefName,labels \
  --jq '.[] | "\(.number) \(.headRefName) [\([.labels[].name] | join(", "))]"'

echo "" && echo "=== RECENT WORKFLOW RUNS (last 10) ===" && \
gh run list --repo veramey/my-website --limit 10 \
  --json displayTitle,status,conclusion,createdAt \
  --jq '.[] | "\(.displayTitle) → \(.status) \(.conclusion)"'
```

Then summarize:
- Which issues are stuck (open but no active PR or workflow)
- Which PRs need attention (needs-rework, blocked, or no label)
- Any failed workflow runs
- Overall pipeline health (🟢 healthy / 🟡 needs attention / 🔴 blocked)
