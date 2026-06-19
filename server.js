require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const intakeRoutes = require('./routes/intake');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust the first proxy hop (needed for correct req.ip behind a reverse
// proxy/load balancer, e.g. on most hosting platforms) — relevant for
// the login rate limiter in routes/auth.js.
app.set('trust proxy', 1);

app.use(express.json());

// --- Admin session (used by /admin and /api/admin/*) ---
app.use(
  session({
    name: 'psc.sid',
    secret: process.env.SESSION_SECRET || 'dev-only-insecure-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.SESSION_SECURE === 'true',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    }
  })
);

if (!process.env.SESSION_SECRET) {
  console.warn(
    '[psc] WARNING: SESSION_SECRET is not set in .env — using an insecure default. ' +
    'Set SESSION_SECRET before deploying to production.'
  );
}

// Serve the static site (including /admin, since it lives at public/admin)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/intake', intakeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`PSC site running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
