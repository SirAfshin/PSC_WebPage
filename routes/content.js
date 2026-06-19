const express = require('express');
const contentStore = require('../data/contentStore');

const router = express.Router();

// GET /api/content — public, read-only. The front-end overlays these
// values onto the page after applying the static EN/FA translations.
router.get('/', (req, res) => {
  res.json({ ok: true, content: contentStore.read() });
});

module.exports = router;
