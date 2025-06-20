const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = async (req, res) => {
  const data = JSON.parse(Buffer.from(req.query.data, 'base64').toString());
  await pool.query('INSERT INTO locations(user_agent, timestamp) VALUES ($1, $2)', [data.ua, data.time]);
  res.setHeader('Content-Type', 'image/gif');
  res.send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
};