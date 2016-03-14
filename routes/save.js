var express = require('express');
var fs = require("fs");
var router = express.Router();

router.post('/', function (req, res) {
    var start = Date.now();
    console.log(req.body);

    var log = "";
    var error = "";

    //LOAD FILES
    var files = {};
    for (var name in req.body) {
        var lang = name.split("__").shift();
        if (!lang) {
            console.log("!lang");
            continue;
        }
        //already loaded
        if (files[lang]) {
            console.log("already loaded");
            continue;
        }

        var file = "public/json/" + lang;
//        if ("origin" == lang) {
//            file = "public/json/origin.json";
//        }

        var file_content;
        try {
            file_content = fs.readFileSync(file);
        } catch (e) {
            var err = e + " saving file: " + file + "<br/>";
            console.log(err);
            error += err;
            continue;
        }
        files[lang] = JSON.parse(file_content);
    }

    //ADD TRADUCTIONS
    for (var name in req.body) {
        var originalValue = "";
        var value = req.body[name];
        //if (value && !/^\s*$/.test(value)) { //!empty

        var nameArray = name.split("__");
        var lang = nameArray.shift();
        var id = nameArray.join("__");
        if(!id){
            console.log("!id on " + name);
            continue;
        }
        if (!lang) {
            console.log("!lang on " + name);
            continue;
        }

        var content = files[lang];
        if(!content){
            console.log("!content on " + name + " with lang.");
            continue;
        }
        var resultJson = "";
        if (Object.prototype.toString.call(content) === '[object Array]') {
            //if exists
            var exists = false;
            for (var i = 0; i < content.length; i++) {
                if (content[i].id == id) {
                    originalValue = content[i].translation;
                    content[i].translation = value;
                    exists = true;
                    continue;
                }
            }
            if (!exists) {
                content.push({id: id, translation: value});
                content.sort(function (a, b) {
                    return a.id - b.id;
                });
            }

            files[lang] = content;

        } else {
            originalValue = content[id];
            content[id] = value;
            files[lang] = content;
        }

        try {
            fs.writeFileSync(file, resultJson);
        } catch (e) {
            error += e + "<br/>";
        }
        //}
        log += (new Date()).toLocaleTimeString() + "<br/>";
        log += "updated '<b>" + id + "</b>' key<br/>";
        log += "on '<b>" + lang + "</b>' lang file<br/>";
        if (originalValue) {
            log += "from '<b>" + originalValue + "</b>'<br>";
        }
        log += "to '<b>" + value + "</b>' <br/><br/>"
    }

    //SORT AND SAVE
    for (var lang in files) {
        var content = files[lang];
        if (Object.prototype.toString.call(content) === '[object Array]') {
            resultJson = JSON.stringify(content);

        } else {
            //sort json
            var editedJson = JSON.stringify(content);
            var jsonArray = editedJson.split("{")[1].split("}")[0].split(",");
            jsonArray.sort(function (a, b) {
                var pos = 1;
                while (true) {
                    if (a[pos] != b[pos]
                            || a[pos] == '"' || b[pos] == '"' || pos == 99) {
                        return a[pos] > b[pos];
                    }
                    pos++;
                }
            });

            resultJson = "{" + jsonArray.join(",") + "}";
        }

        var file = "public/json/" + lang;
        if ("origin" == lang) {
            file = "public/json/origin.json";
        }

        try {
            fs.writeFileSync(file, resultJson);
        } catch (e) {
            var err = e + " with file: " + file;
            console.log(err);
            error += err;
            continue;
        }
        //}
    }

    var duration = Date.now() - start;
    res.render('save', {time: duration, log: log, error: error});
});

module.exports = router;
