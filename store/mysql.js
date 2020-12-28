const mysql = require('mysql');
const debug = require('debug')('app:data_base');
const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection = null;

function handleCon() {
  connection = mysql.createConnection(dbconfig);
  connection.connect((err) => {
    if (err) {
      debug(`[DB error], ${err}`);
      setTimeout(handleCon, 2000);
    } else {
      debug(`[DB Connected]`);
    }
  });

  connection.on('error', (err) => {
    debug(`[DB error], ${err}`);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw new Error(err);
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

function get(table, id, email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ${id ? 'id' : 'email'}=${id || email}`,
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results[0]);
      },
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

function update(table, id, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [data, id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      },
    );
  });
}

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ?`,
      query,
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results[0] || null);
      },
    );
  });
}

module.exports = {
  list,
  get,
  insert,
  update,
  query,
};
