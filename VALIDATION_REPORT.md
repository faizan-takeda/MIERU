# MIERU v7.2 · GitHub Pages validation report

Source: uploaded `MIERU_Enterprise_Pilot_v7_2(4).zip`.

## Verified
- 66/66 reviewed role questions returned the exact original curated answer and each fact retained its specific evidence link.
- All 71 original curated evidence entries and cited URLs preserved in `data/evidence.json` and browser bundle.
- All 300/300 synthetic voices classified into the original five challenge clusters, with six listening channels. UI evidence drawer showed relevant source links.
- All 12 medicine × market combinations and 84 scenario decision elements returned successfully. All 200 source references across those 84 elements resolve to an evidence record.
- All 18 included unapproved rehearsal decisions displayed on Page 4. Filtering accurately reflects the real record distribution; it does not fabricate approvals for missing combinations.
- New saved decisions can be retrieved through Ask MIERU in both same-market and cross-market questions; refresh-safe browser storage implemented with `localStorage`.
- 252/252 cross-market reuse journeys worked across all 3 medicines × 4 markets × 7 elements × 3 receiving markets. 504/504 wrong-medicine reuse paths were rejected.
- JSON export browser control, JSON validation/import and duplicate prevention tested; UI interactions for all four pages tested without JavaScript page errors.

## Browser test methodology
Functional browser checks were run in Chromium using the complete original page HTML/CSS/JS and an embedded service stub. The browser's normal network navigation was blocked by the test runtime, so these tests used an in-memory page and simulated browser-local storage, not a live GitHub Pages deployment. The same bundled code and static assets are shipped; the package is not claimed to have been tested on a public GitHub Pages URL.

## Distinctions from the original Node server
- Live public web/OpenAI API research does not run in a static web host and remains explicitly disabled.
- The original optional server-side MiniLM embeddings are not shipped; non-exact user questions use the original domain module's built-in evidence-ranked local fallback. All exact 66 reviewed questions preserve full content and citations.
- Browser `localStorage` is private to each browser and origin. No cross-user synchronization, approvals, audit log, or shared database is claimed. Export/import of *unapproved pilot* records is supported.

Snapshot: public evidence dated 2026-10-16. Synthetic voice records and pilot decisions are explicitly labelled demonstrations, not actual employee testimony or governance approval.
