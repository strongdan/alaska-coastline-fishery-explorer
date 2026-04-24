const { Pool } = require('pg');

let pool = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // For self-signed certs in RDS if needed:
    // ssl: { rejectUnauthorized: false }
  });
  
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });
  
  console.log('PostgreSQL connection pool initialized.');
} else {
  console.log('DATABASE_URL not set. PostgreSQL integration is disabled.');
}

module.exports = {
  query: (text, params) => {
    if (!pool) return Promise.resolve(null);
    return pool.query(text, params);
  },
  isConfigured: () => pool !== null
};
