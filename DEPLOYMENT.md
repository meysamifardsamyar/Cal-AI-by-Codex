# Nouri deployment checkpoint

Published successfully on 2 November 2026.

- Live private URL: https://nouri-daily-nutrition.placidcourt.chatgpt.site
- Site ID: appgprj_6ae8ab67d344819186397486440cb81e
- Deployment ID: appgdep_6ae8b2f2f29c81919af527c342816c9f
- Saved version ID: appgprj_6ae8ab67d344819186397486440cb81e~appgver_bdb6cb0f7ad48191ad927e2af4c5a718
- Deployed source commit: dba6dc36f62368252345b11bb170d4501a6c84d1
- GitHub source: https://github.com/meysamifardsamyar/Cal-AI-by-Codex/tree/codex/nouri

TypeScript check, production build, and 11 focused API/DOM tests pass. Native Sites deployment reports succeeded. No browser visual QA or physical camera test was available; live OpenAI/Open Food Facts calls were not tested from the restricted authoring environment.

Real photo estimates remain inactive until OPENAI_API_KEY is configured as a production secret. The complete upload, optional-weight, analysis endpoint, result review and manual fallback are implemented. The OpenAI Developers plugin was suggested but no installation/connection was confirmed in this session.

Cloud journal and photo storage use the BUCKET R2 binding. Hosted auth supplies the user identity. Barcode calls use the live Open Food Facts API; tests use mocked responses. Generic food entries are explicitly labelled estimates.

To resume: read HANDOFF.md and README.md, then use the same Site ID. Do not create a new Site. The Site source remote contains the deployed commit; this GitHub branch additionally includes this documentation checkpoint.

Artifact packaging for this fallback builder: from the checkout, run npm run build, then tar -czf /absolute/path/nouri-site.tgz .openai dist/server. The archive must retain dist/server/index.js at that path. The hosting manifest declares r2 as the string BUCKET, not an object.

