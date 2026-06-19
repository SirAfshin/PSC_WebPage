const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'submissions.json');

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeAll(list) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

function create(submission) {
  const list = readAll();
  list.push(submission);
  writeAll(list);
  return submission;
}

function getById(id) {
  return readAll().find((s) => s.id === id) || null;
}

function update(id, changes) {
  const list = readAll();
  const index = list.findIndex((s) => s.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...changes };
  writeAll(list);
  return list[index];
}

function remove(id) {
  const list = readAll();
  const next = list.filter((s) => s.id !== id);
  const removed = next.length !== list.length;
  if (removed) writeAll(next);
  return removed;
}

module.exports = { readAll, writeAll, create, getById, update, remove };
