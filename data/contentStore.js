const fs = require('fs');
const path = require('path');

const CONTENT_FILE = path.join(__dirname, 'content.json');
const DEFAULT_CONTENT = { en: {}, fa: {}, ar: {} };

function read() {
  try {
    return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
  } catch {
    return DEFAULT_CONTENT;
  }
}

function write(content) {
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
}

/**
 * Shallow-merges incoming changes into the existing content per language,
 * so a partial update (e.g. only "en") never wipes out the other language.
 */
function update(changes) {
  const current = read();
  const next = {
    en: { ...current.en, ...(changes.en || {}) },
    fa: { ...current.fa, ...(changes.fa || {}) },
    ar: { ...current.ar, ...(changes.ar || {}) }
  };
  write(next);
  return next;
}

module.exports = { read, write, update };
