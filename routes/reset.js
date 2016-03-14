var express = require('express');
var fs = require("fs");
var router = express.Router();

router.get('/', function (req, res) {
    var start = Date.now();

    var content;
    if (Object.prototype.toString.call(content) === '[object Array]') {
        content = [];
    } else {
        content = {};
    }
    
    var lang = req.query.lang;
    if ("origin" == lang) {
        fs.writeFileSync("public/json/origin.json", JSON.stringify(content));
    } else {
        fs.writeFileSync("public/json/lang_" + lang + ".json", JSON.stringify(content));
    }

    var duration = Date.now() - start;
    res.redirect('/?t=' + duration);
});

module.exports = router;
