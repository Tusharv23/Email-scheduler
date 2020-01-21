"use strict";
const Validator = require("../validators/emailScheduler");
const Send = require("../response");
module.exports = {
  scheduleEmail(req, res) {
    Validator.validate(req, function(err) {
      if (err) {
        Send.response(res, null, "Invalid Input Fields");
      } else {
        var limit = req.cookies.sentLimit || null;
        if (limit == 0) {
          Send.response(res, "User has reached the max limit");
        } else {
          let query = `insert into schedule (message, title, \`to\`, cc, time, status) values ("${req.body.message}","${req.body.title}","${req.body.to}","${req.body.cc}","${req.body.time}","scheduled")`;
          db.query(query, function(err, result) {
            if (err) {
              console.log(err);
              Send.response(res, "Unable to schedule email");
            } else {
              if (limit == null) {
                res.cookie("sentLimit", 9);
              } else {
                res.cookie("sentLimit", --limit);
              }
              Send.response(res, "Scheduled");
              let time = redis.get("lastScheduledEmail");
              if (time > req.body.date_time || time == "undefined") {
                redis.set("lastScheduleEmail", req.body.date_time);
              }
            }
          });
        }
      }
    });
  }
};
