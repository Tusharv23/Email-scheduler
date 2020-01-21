"use strict";

let express = require("express");
let app = express();
let EmailController = require("./controllers/EmailController.js");
let db = require("./config/database");
let redis = require("./config/redis");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let cookieParser = require("cookie-parser");
app.use(cookieParser());

db.connect(function(instance) {
  if (instance) {
    global.db = instance;
  }
});
redis.connect(function(instance) {
  if (instance) {
    global.redis = instance;
  }
});
app.listen(process.env.PORT || 4141);

app.post("/email-schedule", urlencodedParser, (req, res) => {
  EmailController.scheduleEmail(req, res);
});
