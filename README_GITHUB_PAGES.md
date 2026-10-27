# MIERU v7.2 · Static GitHub Pages edition

This release keeps the original four-page v7.2 UI, 66 reviewed questions and source-linked answers, 300 designed synthetic signals, five challenge clusters, 71 source records, 12 medicine × market scenarios (84 decision rows), and the 18 original pilot decision rehearsals. It uses the **original v7.2 business logic**, adapted to run in-browser.

## Deploy
1. Extract the ZIP. Upload the **contents of this folder** to the root of your GitHub repository (`index.html` must be at the root).
2. In GitHub repository **Settings → Pages**, choose **Deploy from a branch**, branch `main` (or your branch), folder `/(root)`, then Save.
3. Open `https://YOURNAME.github.io/YOURREPO/`. Paths are relative, so project subpaths work. No Node.js, bundler, npm, database, or deployment environment variables are needed. The `index.html` can also be opened directly for a quick local preview.

## Scope
- **Page 1:** All 66 curated answers with original text, inline fact-to-source citations, source library, original browser-port domain retrieval, and saved-decision discovery / transfer. Ask any question: best lexical local matching with honest fallback.
- **Page 2:** Original Canvas clustering/hover/3D scenes, six channels, all 300 synthetic voice signals, five challenges and their dated primary sources.
- **Page 3:** Original three medicine × four market dossiers and seven evidence-linked decisions per dossier, with all references displayed.
- **Page 4:** Original decision form, local save and immediate Ask MIERU reuse, plus a searchable, filterable library of every saved case with source links and cross-market reuse questions. JSON export/import helps users carry rehearsal memory from one browser to another.

## Critical boundaries
- **No OpenAI or live public web research:** this requires a secure backend/API, so the checkbox is disabled. An API key must never be embedded in a public GitHub Pages site.
- **No shared enterprise database:** GitHub Pages is a read-only static host. Browser `localStorage` persists decisions only for the current browser + domain and does not automatically synchronize between users/devices. JSON export/import is provided for manually transferring unapproved demo rehearsals, not for centrally approved governance. Clearing site data or using a private window can remove your local saved cases.
- The 18 bundled cases are **synthetic/unapproved pilot rehearsal records**; incoming imported cases are deliberately forced to this same status and reattached only to vetted scenario references.
- Answers and market status are a dated **2026-10-16 public evidence snapshot**, not live clinical/legal/medical advice. Verify current information with owners before acting.
- Do not enter confidential Takeda data or identifiable person information in this public static demo.

## File layout
- `index.html` is the main page.
- `css/app.css`, `js/app.js`, `js/constellation.js`: original UI and 3D clustering.
- `js/domain.js`: browser adaptation of the original `lib/domain.js` engine (no decision logic changed).
- `js/staticApi.js`: secure, serverless browser-only API emulation + validation + persistence and imports.
- `data/*.json`, `data/memory/decisions.json`: retained readable snapshot exports.
- `data/bundle.js`: same records loaded locally without HTTP.
- `assets/`, `vendor/`: self-contained images and markdown rendering dependency.

## Acceptance walkthrough
1. Open index, go to Page 1 → Show Example questions → choose a role → select a question → verify reviewed answer with linked evidence.
2. Page 2 → hover any dot → select listening channel → Connect 300 voices → inspect theme → open sources/limits.
3. Page 3 → test all 3 medicines and 4 markets and click 7 rows per combination. Inspect all reference links.
4. Page 4 → filter pre-seeded decision library → open a saved case → click Ask MIERU or cross-market question.
5. Create a new decision → click a new-market suggestion → confirm the recorded rationale and conditions are surfaced → refresh → return to Page 4 and confirm persistence.
6. Export JSON, import into another browser's page and confirm new records appear (this is manual copy, not automatic enterprise synchronization).
