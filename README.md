# Problem Solving Center — Website + Admin Panel

This repo contains the public landing page for **PSC**, plus a private admin panel for staff to:

- Read and manage messages submitted through the "Submit a Problem" intake form
- Edit key pieces of site copy (hero text, status badges, team placeholders, footer, contact email) — in both English and Persian — without touching code

## Languages
The public site is fully bilingual: **English** and **Persian (Farsi)**.

- Click the **فارسی / English** toggle in the top navigation bar to switch languages.
- Persian mode automatically switches the page to right-to-left (RTL) layout, swaps in the
  Vazirmatn typeface, and converts numerals to Persian digits.
- The chosen language is remembered (via `localStorage`).
- All translated strings live in `public/js/i18n.js`.

## Admin Panel

### Setup
1. Copy `.env.example` to `.env`.
2. Generate a password hash for your admin account:
   ```bash
   npm install
   npm run hash-password -- "YourStrongPasswordHere"
   ```
   This prints a line like `ADMIN_PASSWORD_HASH=$2a$12$...` — paste it into `.env`.
3. Set `ADMIN_USERNAME` in `.env` (the username you'll log in with).
4. Generate a session secret and set `SESSION_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
5. When you deploy behind HTTPS, set `SESSION_SECURE=true` in `.env`.

### Using it
Run the server (`npm start`) and open **`/admin`** (e.g. `http://localhost:3000/admin`).

**Messages tab**
- Lists every problem submitted through the public intake form, newest first.
- Click a message to read the full details (contact info, timeline, desired outcome, etc.).
- Opening a message automatically marks it **Read**. You can also **Archive**, **Restore**,
  or **Delete** a message, and leave internal notes (visible only in the admin panel).
- Filter by status: All / New / Read / Archived.

**Site Content tab**
- Edit the hero headline/subtitle, the four status badges, team-section placeholders, the
  final call-to-action, the footer tagline, and the contact email — separately for English
  and Persian (use the language tabs at the top of the form).
- Click **Save Changes** to publish — edits appear on the live site immediately, no deploy
  needed.
- Fields left blank simply fall back to the site's default text, so you can't accidentally
  "blank out" a section.

### Extending the editable fields
Only a curated subset of the page is admin-editable by default, to keep the panel focused.
To expose another piece of text:
1. Add `data-admin-key="some.key"` to the element in `public/index.html` (alongside its
   existing `data-i18n`, if any).
2. Add `"some.key": "Default value"` to **both** `en` and `fa` in `data/content.json`.
3. Add a matching entry to `CONTENT_SCHEMA` in `public/admin/js/admin.js` so it shows up as
   a field in the admin form.

### Security notes
- Sessions are server-side (via `express-session`) with an `httpOnly` cookie — credentials
  never touch client-side JS.
- Passwords are hashed with bcrypt; the plaintext password is never stored.
- Login attempts are rate-limited (5 attempts per 15 minutes per IP) to slow down brute-force
  attempts. This is in-memory and resets on server restart — for high-traffic production use,
  consider a proper rate-limiting/IP-blocking layer (e.g. at the reverse proxy).
- `/admin` currently supports a single shared admin account. If your team needs individual
  logins, audit trails, or role-based permissions, that's a natural next step.
- There's no CSRF token on the admin API yet; since the panel is same-origin and cookie-based,
  exposure is limited, but consider adding `csurf` (or similar) before handling more sensitive
  operations.

## Running locally
```bash
npm install
npm start
```
Then open:
- **http://localhost:3000** — public site
- **http://localhost:3000/admin** — admin panel

## Project structure
```
public/
  index.html           — page markup (data-i18n = translation key, data-admin-key = editable by staff)
  css/
    variables.css       — design tokens (colors, fonts, spacing)
    base.css             — reset + global typography
    components.css       — reusable UI pieces (nav, cards, forms, etc.)
    sections.css          — page-section-specific layout
    rtl.css                — right-to-left layout overrides + language toggle button
  js/
    i18n.js                — translation dictionary + language switch engine
    content-loader.js       — overlays admin-edited content on top of the static translations
    ui.js                    — mobile nav toggle, footer year
    reveal.js                 — scroll-in animations
    intake-form.js             — project intake form submission
  admin/
    index.html                 — admin login + dashboard markup
    css/admin.css                — admin panel styling
    js/admin.js                   — admin login, inbox, and content-editor logic

routes/
  intake.js              — POST /api/intake (public — creates a submission)
  auth.js                 — POST /api/auth/login, /logout, GET /api/auth/session
  admin.js                  — protected: manage submissions + site content
  content.js                  — GET /api/content (public, read-only — feeds content-loader.js)

middleware/
  requireAuth.js          — guards the protected admin routes

data/
  submissionsStore.js      — read/write helpers for submissions.json
  contentStore.js            — read/write helpers for content.json
  submissions.json             — stored intake submissions (gitignored)
  content.json                  — editable site copy, EN + FA (tracked — these are your defaults)

scripts/
  hash-password.js          — CLI helper to generate ADMIN_PASSWORD_HASH

server.js                    — Express entry point (sessions, static files, API routes)
```
