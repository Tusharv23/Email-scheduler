"use strict";

const redis = require("redis");
require("dotenv").config();
let connection;
let redis_config = {
  host: "127.0.0.1",
  port: 6379
};
module.exports = {
  connect(fn) {
    var client = redis.createClient();
    fn(client);
  }
};
