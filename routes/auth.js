const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const attemptsByIp = new Map();

function isLockedOut(ip) {
  const entry = attemptsByIp.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attemptsByIp.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip) {
  const entry = attemptsByIp.get(ip);
  if (!entry || Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attemptsByIp.set(ip, { count: 1, firstAttemptAt: Date.now() });
  } else {
    entry.count += 1;
  }
}

function clearAttempts(ip) {
  attemptsByIp.delete(ip);
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const ip = req.ip;

  if (isLockedOut(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many failed attempts. Please try again in a few minutes.'
    });
  }

  const { username, password } = req.body || {};
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    return res.status(500).json({
      ok: false,
      error: 'Admin account is not configured on the server. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH in .env.'
    });
  }

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: 'Username and password are required.' });
  }

  const usernameMatches = username === expectedUsername;
  const passwordMatches = usernameMatches && (await bcrypt.compare(password, expectedHash));

  console.log(usernameMatches, passwordMatches)


  if (!usernameMatches || !passwordMatches) {
    recordFailedAttempt(ip);
    return res.status(401).json({ ok: false, error: 'Invalid username or password.' });
  }

  clearAttempts(ip);
  req.session.isAdmin = true;
  req.session.username = username;
  res.json({ ok: true, username });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('psc.sid');
    res.json({ ok: true });
  });
});

// GET /api/auth/session
router.get('/session', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.json({ ok: true, authenticated: true, username: req.session.username });
  }
  res.json({ ok: true, authenticated: false });
});

module.exports = router;
