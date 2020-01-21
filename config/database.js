"use strict";

const mysql = require("mysql");
require("dotenv").config();
let connection;
let db_config = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
};
module.exports = {
  connect(fn) {
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
      if (err) {
        console.log("error when connecting to db:", err);
      }
    });

    connection.on("error", function(err) {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
      } else {
        throw err;
      }
    });
    fn(connection);
  },
  pingDb(fn) {
    connection.ping(function(err, res) {
      if (err) {
        fn(false);
      }
    });
  }
};
