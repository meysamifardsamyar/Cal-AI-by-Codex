# Nouri deployment checkpoint

Published successfully on 2 November 2026.

- Live private URL: https://nouri-daily-nutrition.placidcourt.chatgpt.site
- Site ID: appgprj_6ae8ab67d344819186397486440cb81e
- Deployment ID: appgdep_6ae8b816d9088191a767f77d44a5fbf7
- Saved version ID: appgprj_6ae8ab67d344819186397486440cb81e~appgver_bdb6cb0f7ad48191ad927e2af4c5a718
- Deployed source commit: dba6dc36f62368252345b11bb170d4501a6c84d1
- GitHub source: https://github.com/meysamifardsamyar/Cal-AI-by-Codex/tree/codex/nouri

TypeScript check, production build, and 11 focused API/DOM tests pass. Native Sites deployment reports succeeded. No browser visual QA or physical camera test was available; live OpenAI/Open Food Facts calls were not tested from the restricted authoring environment.

OPENAI_API_KEY is now configured as a private production secret (environment revision 1). The saved version was redeployed successfully with that revision on 2 November 2026. Photo analysis is enabled. The complete upload, optional-weight, analysis endpoint, result review and manual fallback are implemented. A live photo request is still needed to verify the supplied key's API permissions and billing. No credential value is stored in this repository.

Cloud journal and photo storage use the BUCKET R2 binding. Hosted auth supplies the user identity. Barcode calls use the live Open Food Facts API; tests use mocked responses. Generic food entries are explicitly labelled estimates.

To resume: read HANDOFF.md and README.md, then use the same Site ID. Do not create a new Site. The Site source remote contains the deployed commit; this GitHub branch additionally includes this documentation checkpoint.

Artifact packaging for this fallback builder: from the checkout, run npm run build, then tar -czf /absolute/path/nouri-site.tgz .openai dist/server. The archive must retain dist/server/index.js at that path. The hosting manifest declares r2 as the string BUCKET, not an object.

