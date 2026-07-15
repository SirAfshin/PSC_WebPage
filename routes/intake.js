const express = require('express');
const submissionsStore = require('../data/submissionsStore');

const router = express.Router();

// POST /api/intake
router.post('/', (req, res) => {
  const {
    name, organization, email, phone, faculty,
    problem, outcome, timeline, support,
    data, confidentiality
  } = req.body || {};

  if (!name || !email || !problem) {
    return res.status(400).json({
      ok: false,
      error: 'Name, email, and a problem description are required.'
    });
  }

  const submission = {
    id: Date.now().toString(36),
    receivedAt: new Date().toISOString(),
    status: 'new', // 'new' | 'read' | 'archived' — managed from the admin panel
    notes: '',
    name,
    organization: organization || '',
    email,
    phone: phone || '',
    faculty: faculty || '',
    problem,
    outcome: outcome || '',
    timeline: timeline || '',
    support: support || '',
    data: data || '',
    confidentiality: confidentiality || ''
  };

  submissionsStore.create(submission);

  // To notify the team by email instead of (or in addition to) file storage,
  // add a mailer here using the SMTP_* values from .env — see README.md.

  res.json({ ok: true, message: 'Request received.' });
});

module.exports = router;
