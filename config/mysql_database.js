// backend/config/db.js

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Create the connection pool
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST || "caboose.proxy.rlwy.net",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "KoKAcqwyXyyryZvMjVWoZyPNcHfBrByv",
  database: process.env.MYSQL_DATABASE || "railway",
  port: process.env.MYSQL_PORT || 39411,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: Test the connection (good for debugging during dev)
async function testConnection() {
  try {
    const connection = await mysqlPool.getConnection();
    console.log("✅ MySQL connection established.");
    connection.release();
  } catch (error) {
    console.error("❌ Error connecting to MySQL:", error.message);
  }
}

testConnection();

module.exports = mysqlPool;
