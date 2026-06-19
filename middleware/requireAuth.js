/**
 * Protects a route so it only proceeds if the current session is
 * authenticated as an admin (set by routes/auth.js on successful login).
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({ ok: false, error: 'Not authenticated.' });
}

module.exports = requireAuth;
