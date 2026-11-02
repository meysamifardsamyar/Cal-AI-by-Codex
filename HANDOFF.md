# Resume Nouri here

User goal: build a better Cal AI-style nutrition app, with photo estimates and optional grams, German supermarket barcode support, age/body/goal setup, useful extras, and durable source saving. User delegated design decisions and asked to proceed without unnecessary permission checks.

## Identity and paths

- Project: `appgprj_6ae8ab67d344819186397486440cb81e`
- Expected origin (not proof of deployment): https://nouri-daily-nutrition.placidcourt.chatgpt.site
- Primary checkout: `/workspace/sites/nouri`
- Existing user Git repository: `/workspace/Cal-AI-by-Codex`, origin https://github.com/meysamifardsamyar/Cal-AI-by-Codex.git
- New Site is owner-private; do not change access just to publish.

## Implementation

- `src/main.tsx`: responsive daily dashboard, diary, progress, settings, modal workflows.
- `src/AddFood.tsx`: photo upload/analysis, ZXing barcode camera, product lookup, food search, manual entry, portion review and favorites.
- `src/Profile.tsx`: adult onboarding and goals.
- `src/useJournal.ts`: cloud saving plus local recovery.
- `src/nutrition.mjs`: normalization, portion math and goal formulas.
- `worker/api.mjs`: signed-in state API, Open Food Facts proxy, OpenAI photo estimate API.
- `scripts/build.mjs`: self-contained Worker build; `scripts/dev.mjs`: local Vite and API server.

## Known prerequisites

- OpenAI Developers plugin was requested but has not been confirmed connected. Real photo analysis requires `OPENAI_API_KEY` configured as a Sites runtime secret. Follow that plugin's API-key skill if connected; do not ask for API secrets in chat or add them to source.
- The attached cloud environment has package-manager/Git allowlists only, with no secrets. Local direct integration tests against OpenAI/Open Food Facts are not authorized by its current network policy. Production Workers use their own runtime connectivity.
- Sites helper scripts and full Vinext starter were not present locally; cloud skill docs were readable, helper code was not. A small compatible Worker build is used as the fallback. Do not claim helpers or browser QA ran.
- The available browser skill requires a Node REPL tool that is absent from this tool surface. No browser-controlled visual verification has occurred yet.

## Checkpoint

Type checking and production build pass. Eleven focused Node/DOM tests pass, covering nutrition math, German product normalization, validation, authentication, per-user storage, stale-write conflicts, configured/missing AI behavior, onboarding, manual food scaling, persistence after reload, deletion, and hydration. External API calls in these tests are mocked. Source synchronization and final publication are in progress. Browser visual verification and physical camera testing are not available in this environment.

## Next steps

1. Finish verification; fix actual defects, including validating R2 manifest shape through deployment.
2. Sync the exact source state to the Site Git repository, build and package the matching artifact, and publish privately.
3. Save a source backup and push a new branch to the user's existing Git repository where authorized.
4. Report the literal verified URL, what works, and the outstanding AI connection/hardware-camera test limits.

No private runtime journal files or credentials should be committed or uploaded with source.
