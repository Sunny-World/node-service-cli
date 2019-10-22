"use strict";
var projConf = require(":root/conf/proj.conf.js").default;
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport(
    {
        service: "163",
        auth: {
            user: projConf.mail.user, //发送者邮箱
            pass: projConf.mail.pass //邮箱第三方登录授权码
        },
        debug: true
    },
    {
        from: projConf.mail.user, //发送者邮箱
        headers: {
            "X-Laziness-level": 1000
        }
    }
);

console.log("SMTP Configured");

exports.default = transporter;
