# Problem Solving Center Landing Page
This repo contains the landing page of **PSC**.
- Introducing the center and its team
- Presenting their task
- Functional submitting process

## Languages
The site is fully bilingual: **English** and **Persian (Farsi)**.

- Click the **فارسی / English** toggle in the top navigation bar to switch languages.
- Persian mode automatically switches the page to right-to-left (RTL) layout, swaps in the
  Vazirmatn typeface, and converts numerals (e.g. timeline step numbers, dates) to Persian digits.
- The chosen language is remembered (via `localStorage`) so returning visitors see the same
  language on their next visit.
- All translated strings live in one place: `public/js/i18n.js`. To add a new translatable
  string anywhere on the page:
  1. Add `data-i18n="Your English Sentence"` to the element (or `data-i18n-placeholder="..."`
     for input placeholders, `data-i18n-aria-label="..."` for `aria-label`s).
  2. Add `"Your English Sentence": "..."` to **both** `translations.en` (identity map) and
     `translations.fa` (Persian translation) in `public/js/i18n.js`.

## Running locally
```bash
npm install
npm start
```
Then open http://localhost:3000.

## Project structure
```
public/
  index.html        — page markup (every translatable string carries a data-i18n key)
  css/
    variables.css    — design tokens (colors, fonts, spacing)
    base.css         — reset + global typography
    components.css   — reusable UI pieces (nav, cards, forms, etc.)
    sections.css      — page-section-specific layout
    rtl.css           — right-to-left layout overrides + language toggle button
  js/
    i18n.js           — translation dictionary + language switch engine
    ui.js              — mobile nav toggle, footer year
    reveal.js          — scroll-in animations
    intake-form.js     — project intake form submission
routes/
  intake.js            — POST /api/intake handler
server.js              — Express entry point
data/
  submissions.json     — stored intake form submissions (gitignored)
```
