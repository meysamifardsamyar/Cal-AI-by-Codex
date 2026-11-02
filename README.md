# Nouri

A responsive nutrition companion built for everyday use in Germany. The app includes an explicitly marked sample day; personal journals begin empty.

## Features

- Photo upload with optional total edible grams, contextual notes, AI estimates, and editable review before saving.
- Live EAN/UPC camera scanner, manual barcode entry, German names and nutrition from Open Food Facts.
- Generic German staple foods, manual food logging, favorites, meal diary, date history, hydration, weight trends.
- Adult profile setup, Mifflin–St Jeor goal calculation, adjustable calorie/macro/fiber/water targets.
- Private signed-in cloud journal with R2 conditional writes, browser recovery copy, JSON import/export.
- Responsive layouts, keyboard focus management, reduced-motion support, self-hosted fonts.

## Develop

Requires Node 22 or newer.

```sh
npm ci
npm run dev
```

Open the printed local URL (normally http://127.0.0.1:5173). The development API uses a local preview identity and `work/local-data/`. Neither is included in production.

```sh
npm run check
npm test
npm run build
```

The build emits a self-contained ES module Worker at `dist/server/index.js`, with the React app and its assets embedded, and `.openai/hosting.json`. Deploy through Sites. The managed Sites starter/helper executables were unavailable in this session, so this project uses a small explicit Vite + ES module Worker build rather than pretending the prescribed helper ran.

## Runtime

- `BUCKET`: private R2 object storage, declared in the hosting manifest. Per-user data is keyed by the Sites authenticated user ID.
- `OPENAI_API_KEY`: production secret, needed for real photo estimates. Never expose this in client code.
- `OPENAI_MODEL`: optional; defaults to `gpt-4.1-mini`.

Sites owns sign-in and injects `oai-authenticated-user-id`. All journal, product and photo APIs require it. Mutations reject cross-origin requests. The source repository never contains API credentials or journal data.

Photo analysis sends the resized photo and optional notes/weight to OpenAI only when the user selects analysis. Without an API key, the UI explains that analysis is awaiting connection and offers manual logging. No fabricated estimate is returned.

## Data and limitations

Open Food Facts is a community-maintained database licensed under ODbL. EAN/UPC coverage is product-dependent, including for German supermarket brands. Missing products or nutrition fields require manual entry. The scanner uses ZXing and needs browser camera permission and a secure context.

Generic foods and AI results are estimates, reviewed by the user. Nutrition targets are estimates for adults, not medical prescriptions. The app is an original implementation inspired by common nutrition-tracking workflows, not an official Cal AI product or a claim of complete proprietary feature parity.

Photos attached to meals are stored as separate private R2 objects; journal writes are capped at 4 MB. Export backups contain personal nutrition data and photo references. The photos remain tied to your signed-in Site account. Demo food photography is remotely loaded from Unsplash. Fonts are bundled locally.

Read `HANDOFF.md` to resume work and see current verification and deployment state.
