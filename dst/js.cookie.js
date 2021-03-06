"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cookie = {

  get: function get(name) {
    var match = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    var value = match ? unescape(match[2]) : match;
    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value;
  },

  set: function set(name, value) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var cookie = name + "=" + escape(JSON.stringify(value)) + "; path=" + (options.path ? escape(options.path) : "/");
    if (options.domain) cookie += "; domain=" + escape(options.domain);
    if (options.secure) cookie += "; secure";
    if (options.expires) cookie += "; expires=" + options.expires;
    if (options.live) cookie += "; expires=" + expiresFromLive(options.live);
    document.cookie = cookie;
    return value;
  },

  remove: function remove(name) {
    var value = this.get(name);
    this.set(name, value, { live: -1 });
    return value;
  }

};

function expiresFromLive(live) {
  var date = new Date();
  date.setDate(date.getDate() + parseInt(live));
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toUTCString();
}

exports["default"] = Cookie;
module.exports = exports["default"];
