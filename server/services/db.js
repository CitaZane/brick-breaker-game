const mysql = require('mysql2/promise');
const config = require('../config.js');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db); //connect to database
  const [results, ] = await connection.execute(sql, params); // execute query
  return results; // return results
}

module.exports = {
  query
}