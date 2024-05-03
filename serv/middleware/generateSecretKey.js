const crypto = require('crypto');

// Generate a random string of 64 characters
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret key:', secretKey);
