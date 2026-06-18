require('dotenv').config();
const express = require('express');
const path = require('path');
const intakeRoutes = require('./routes/intake');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies (the intake form posts JSON)
app.use(express.json());

// Serve the static site from /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', intakeRoutes);

app.listen(PORT, () => {
  console.log(`PSMMC site running at http://localhost:${PORT}`);
});
