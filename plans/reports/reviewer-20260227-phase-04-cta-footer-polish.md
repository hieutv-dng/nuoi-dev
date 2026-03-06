## Code Review Summary

### Scope
- Files: `index.html`, `css/globals.css`, `css/cta.css`, `css/footer.css`, `js/main.js`, `assets/images/favicon.svg`, `assets/images/og-image.svg`
- LOC reviewed: 1,015
- Focus: Phase 04 (CTA + footer + polish)
- Scout findings:
  - Internal hash links map correctly to existing section IDs.
  - 7 placeholder links (`href="#"`) now rely on JS suppression.
  - New CTA/footer selectors are only consumed by `index.html` + dedicated CSS.

### Overall Assessment
Phase 04 is visually complete and mostly clean, but not fully production-ready for sharing/SEO surfaces and final CTA behavior.

### Critical Issues
- None.

### High Priority
1. Social preview metadata uses relative SVG images, which is high-risk for broken cards on X/Twitter and some OG consumers.
- Evidence: `index.html:14`, `index.html:19` point to `assets/images/og-image.svg`; OG asset is SVG at `assets/images/og-image.svg:1`.
- Impact: Link shares may render without image preview, reducing CTR and campaign performance.
- Recommendation: Use an absolute HTTPS URL to a PNG/JPG OG image (e.g. 1200x630), keep SVG optional for internal use.

### Medium Priority
1. `apple-touch-icon` points to SVG favicon, which is not reliably supported for iOS home screen icons.
- Evidence: `index.html:22` references `assets/images/favicon.svg`; file is SVG at `assets/images/favicon.svg:1`.
- Impact: Saved-to-home-screen icon may be missing or degraded on iOS.
- Recommendation: Provide a PNG touch icon (e.g. 180x180) and point `apple-touch-icon` to that PNG.

2. Primary CTA and footer social links are non-functional in runtime due to placeholder `#` + global click suppression.
- Evidence: Placeholder anchors at `index.html:358`, `index.html:359`, `index.html:387-391`; suppression logic in `js/main.js:73-79`.
- Impact: Keyboard/mouse users can activate links but no action occurs; conversion path remains blocked in production.
- Recommendation: Wire real destinations (`mailto:`, social URLs, form route) or render disabled/non-link UI until destinations exist.

### Low Priority
1. Missing image alt metadata for social cards.
- Evidence: `index.html:14-19` includes image meta tags, but no `og:image:alt` / `twitter:image:alt`.
- Impact: Lower accessibility/quality for social previews.
- Recommendation: Add both alt tags with concise Vietnamese descriptions.

### Edge Cases Found by Scout
- Smooth-scroll handler (`js/main.js:47-70`) correctly skips `href="#"` links and only intercepts valid section hashes.
- Reduced-motion handling is implemented in both CSS and JS (`css/globals.css:162-172`, `js/main.js:48`).
- No duplicate IDs detected in `index.html`.

### Positive Observations
- CTA/footer structure is semantic (`section`, `footer`, `nav`) with clean class separation.
- Mobile adaptations exist for CTA buttons and footer grid (`css/cta.css:106-120`, `css/footer.css:98-125`).
- Footer year auto-update is resilient (`js/main.js:148-152`).

### Recommended Actions
1. Replace OG/Twitter image URLs with absolute PNG/JPG URLs.
2. Add iOS-compatible touch icon asset and update meta link.
3. Replace placeholder CTA/social links with real destinations before release.
4. Add `og:image:alt` and `twitter:image:alt` tags.

### Metrics
- Type Coverage: N/A (vanilla HTML/CSS/JS)
- Test Coverage: N/A (no automated test suite in scope)
- Linting Issues: 0 syntax issues in reviewed JS (`node --check js/main.js`)

### Unresolved Questions
- Is this phase intended for production release now, or still a staging milestone where placeholder links are acceptable?
- What is the final public domain for absolute OG/Twitter image URLs?
