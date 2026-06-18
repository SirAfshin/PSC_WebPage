const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'submissions.json');

function readSubmissions() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeSubmissions(list) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

// POST /api/intake
router.post('/intake', (req, res) => {
  const {
    name, organization, email, phone,
    problem, outcome, timeline, support,
    data, confidentiality
  } = req.body || {};

  if (!name || !organization || !email || !problem) {
    return res.status(400).json({
      ok: false,
      error: 'Name, organization, email, and a problem description are required.'
    });
  }

  const submission = {
    id: Date.now().toString(36),
    receivedAt: new Date().toISOString(),
    name,
    organization,
    email,
    phone: phone || '',
    problem,
    outcome: outcome || '',
    timeline: timeline || '',
    support: support || '',
    data: data || '',
    confidentiality: confidentiality || ''
  };

  const submissions = readSubmissions();
  submissions.push(submission);
  writeSubmissions(submissions);

  // To notify the team by email instead of (or in addition to) file storage,
  // add a mailer here using the SMTP_* values from .env — see README.md.

  res.json({ ok: true, message: 'Request received.' });
});

module.exports = router;
