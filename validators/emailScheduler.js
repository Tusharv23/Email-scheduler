"use strict";

module.exports = {
  validate(req, fn) {
    if (
      req.body.message == "undefined" ||
      req.body.message.length > 180 ||
      req.body.message.length == 0
    )
      fn(1);
    else if (
      req.body.title == "undefined" ||
      req.body.title.length > 20 ||
      req.body.title.length == 0
    )
      fn(1);
    else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.to)
    ) {
      fn(1);
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.cc)
    ) {
      fn(1);
    } else if (new Date(req.body.time) == "undefined") {
      fn(1);
    } else fn(0);
  }
};
