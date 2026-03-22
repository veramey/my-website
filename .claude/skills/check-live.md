Run Playwright smoke tests against the live site and report the result.

```bash
cd /Users/mojpizduk/Projects/my-website && \
BASE_URL=https://veramey.github.io/my-website \
npx playwright test tests/smoke.spec.ts \
  --config playwright.live.config.ts \
  --reporter=line 2>&1
```

After running, report:
- Whether all tests passed or which tests failed
- The live site URL: https://veramey.github.io/my-website
- If tests failed: summarize what's broken and suggest whether a bug issue should be created
