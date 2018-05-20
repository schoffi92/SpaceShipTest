var Express = require("express");
var App = Express();
var Fs = require("fs");
var Path = require("path");
var Url = require('url');
var Pug = require("pug");

var port = process.env.PORT || 3000;
var devMode = process.env.devMode || false;
var siteconfig = require("./siteconfig.json");
siteconfig["devMode"] = true;
var origPublicPath = Path.normalize(__dirname + "/public");
var publicPath = Path.normalize(__dirname + (devMode ? "/app" : "/public"));

App.use("*", function (req, res, next) {
    var pathname = Path.normalize(Url.parse(req.originalUrl).pathname);
    var p = Path.normalize(publicPath + pathname);
    var dt = new Date();

    if (p[p.length-1] == "\\" || p[p.length-1] == "/")
    {
        p += "index.html";
    }

    if (devMode) {
        // HTML File
        if (p.indexOf(".html") > 0) {
            p = Path.normalize(publicPath + "/view" + pathname.replace(".html", ".pug"));
        }

        if (p.indexOf("node_modules") >= 0) {
            p = Path.normalize(__dirname + pathname);
        }

        if (p.indexOf(".css") > 0) {
            p = Path.normalize(origPublicPath + pathname);
        }
    }

    Fs.appendFile(__dirname + "/log/access.log", "[" + dt.toLocaleString() + "] Requested " + pathname + "\n", function (err) {
        if (err) {
            return console.log(err);
        }
    });

    Fs.exists(p, function(exists) {
        if (exists) {
            if (p.indexOf(".pug") > 0) {
                res.send(Pug.renderFile(p, siteconfig));
                return;
            }
            res.sendFile(p);
        }
        else {
            // 404
            Fs.appendFile(__dirname + "/log/notfound.log", "[" + dt.toLocaleString() + "] File Not Found: " + p + "\n", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            next();
        }
    }); 
});

App.listen(port, function () {
    if (devMode) {
        console.log("Development Mode Is Active");
    }
    console.log("Starting server... on localhost:" + port);
});