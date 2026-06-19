/**
 * Generates a bcrypt hash for the admin panel password.
 *
 * Usage:
 *   npm run hash-password -- "YourStrongPasswordHere"
 *
 * Copy the printed hash into ADMIN_PASSWORD_HASH in your .env file.
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "YourStrongPasswordHere"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

console.log('\nAdd this line to your .env file:\n');
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
