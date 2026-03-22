Run a comprehensive SEO audit of the my-website project. Check each item below and report findings.

**1. Sitemap & Robots**
```bash
ls /Users/mojpizduk/Projects/my-website/public/sitemap.xml 2>/dev/null && echo "sitemap EXISTS" || echo "sitemap MISSING"
ls /Users/mojpizduk/Projects/my-website/public/robots.txt 2>/dev/null && echo "robots.txt EXISTS" || echo "robots.txt MISSING"
```

**2. All pages — check for meta title + description**
```bash
grep -rn "og:title\|og:description\|<title\|meta.*description" \
  /Users/mojpizduk/Projects/my-website/src/pages/ \
  --include="*.tsx" -l
```

Then for each page file, check if it has: `<title>`, `<meta name="description"`, `og:title`, `og:description`, `og:url`.

**3. Broken internal links — find links to pages that don't exist**
```bash
# Find all href="/..." links in src/
grep -rh 'href="/' /Users/mojpizduk/Projects/my-website/src/ --include="*.tsx" \
  | grep -oP 'href="\K[^"]+' | sort -u
```

Then check each unique path against files in `src/pages/` to identify missing pages.

**4. Image alt tags**
```bash
grep -rn '<img' /Users/mojpizduk/Projects/my-website/src/ --include="*.tsx" | grep -v 'alt='
```
Report any `<img>` without `alt` attribute.

**5. Heading hierarchy**
Check that each page has exactly one `<h1>` and that headings are sequential (h1→h2→h3).

**6. Canonical URLs**
```bash
grep -rn "canonical" /Users/mojpizduk/Projects/my-website/src/ --include="*.tsx"
```

**Report format:**
Produce a prioritized list:

🔴 CRITICAL (blocks indexing or has broken links)
🟡 IMPORTANT (hurts SEO ranking)
🟢 NICE TO HAVE (optimization)

For each issue: file path, what's missing, recommended fix.

End with: total pages audited, pass/fail count per category.
