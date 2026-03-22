The user wants to create a new content issue for the my-website project and trigger the pipeline.

Extract the article title/topic from the user's message (e.g. "/new-article Best AI stack under $150/mo").

Steps:

**1. Read PRD.md** to find the relevant section for this article (Tools, Guides, Templates, Pages).

**2. Determine the article type and URL slug:**
- Guides → `/guides/[slug]` (how-to, workflow, implementation articles)
- Tools roundup → `/tools/best-[slug]` (best-X-for-agencies format)
- Tools comparison → `/tools/[tool-a]-vs-[tool-b]`
- Tools stack → `/tools/[slug]-stack`
- Templates → `/templates/[slug]`
- Pages → `/[slug]` (about, services, etc.)

**3. Create a GitHub issue:**
```bash
gh issue create \
  --repo veramey/my-website \
  --title "ARTICLE_TITLE_HERE" \
  --body "ARTICLE_BODY_HERE"
```

The issue body should follow this structure:
```
## What to build
[1–2 sentences describing the article]

## URL
`/section/slug-here`

## Target reader
Small agency owner or operator (2–10 people) looking for practical implementation advice.

## Content requirements
- [3–5 specific content requirements from PRD context]
- Include SEO meta: title, description (under 160 chars), og tags
- Follow existing article page structure in src/pages/

## Reference PRD section
[Relevant PRD section name, e.g. "Section 3.4 Tools — B. Comparisons"]
```

**4. After creating the issue, trigger the pipeline:**
```bash
sleep 3
gh run list --repo veramey/my-website --workflow "Intake Agent" --limit 3 \
  --json displayTitle,status,createdAt \
  --jq '.[] | "\(.displayTitle) \(.status) \(.createdAt)"'
```

**5. Report back** with:
- Issue number and URL
- Confirmation that Intake Agent triggered automatically
- Expected pipeline flow: Intake → Refinement → Breakdown → AI Teammate
