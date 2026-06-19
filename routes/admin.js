const express = require('express');
const submissionsStore = require('../data/submissionsStore');
const contentStore = require('../data/contentStore');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// All routes below require an authenticated admin session.
router.use(requireAuth);

const VALID_STATUSES = ['new', 'read', 'archived'];

/* =====================================================
   SUBMISSIONS (intake messages)
===================================================== */

// GET /api/admin/submissions?status=new
router.get('/submissions', (req, res) => {
  let list = submissionsStore.readAll();

  const { status } = req.query;
  if (status && VALID_STATUSES.includes(status)) {
    list = list.filter((s) => (s.status || 'new') === status);
  }

  // Newest first
  list = [...list].sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));

  res.json({ ok: true, submissions: list });
});

// GET /api/admin/submissions/:id
router.get('/submissions/:id', (req, res) => {
  const submission = submissionsStore.getById(req.params.id);
  if (!submission) return res.status(404).json({ ok: false, error: 'Submission not found.' });
  res.json({ ok: true, submission });
});

// PATCH /api/admin/submissions/:id  body: { status?: 'new'|'read'|'archived', notes?: string }
router.patch('/submissions/:id', (req, res) => {
  const { status, notes } = req.body || {};
  const changes = {};

  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ ok: false, error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    changes.status = status;
  }

  if (notes !== undefined) {
    changes.notes = String(notes);
  }

  const updated = submissionsStore.update(req.params.id, changes);
  if (!updated) return res.status(404).json({ ok: false, error: 'Submission not found.' });

  res.json({ ok: true, submission: updated });
});

// DELETE /api/admin/submissions/:id
router.delete('/submissions/:id', (req, res) => {
  const removed = submissionsStore.remove(req.params.id);
  if (!removed) return res.status(404).json({ ok: false, error: 'Submission not found.' });
  res.json({ ok: true });
});

/* =====================================================
   SITE CONTENT
===================================================== */

// GET /api/admin/content — same data as the public endpoint, kept here
// too so the admin panel only ever talks to /api/admin/* while logged in.
router.get('/content', (req, res) => {
  res.json({ ok: true, content: contentStore.read() });
});

// PUT /api/admin/content  body: { en: {...}, fa: {...} }  (partial merge per language)
router.put('/content', (req, res) => {
  const { en, fa } = req.body || {};

  if (en && typeof en !== 'object') {
    return res.status(400).json({ ok: false, error: '"en" must be an object of key/value strings.' });
  }
  if (fa && typeof fa !== 'object') {
    return res.status(400).json({ ok: false, error: '"fa" must be an object of key/value strings.' });
  }

  const updated = contentStore.update({ en, fa });
  res.json({ ok: true, content: updated });
});

module.exports = router;
