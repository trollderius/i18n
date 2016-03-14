var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    var time = req.query.t;
    if (!time) {
        this.start = Date.now();
    }

    var error = "";
    var files = fs.readdirSync("public/json");
    console.log("files: " + JSON.stringify(files));
    getFiles(files, function (jsonArray) {
        console.log("JSON ARRAY: ");
        console.log(jsonArray);

        //original
        getJSON("public/json/~origin.json", function (origin, err) {
            console.log("ORIGIN: ");
            console.log(origin);

            if (err) {
                console.log("error:  " + err);
                error += err;
            }

            if (origin) {
                //parse
                try {
                    origin = JSON.parse(origin);
                } catch (e) {
                    console.log(e);
                    error += " Can't parse json file! " + e;
                    res.render('index', {error: error});
                    return;
                }
                //sort kind of file
                origin = getTranslationArray(origin);
            }

            if (!time) {
                time = Date.now() - this.start;
            }

            res.render('index', {origin: origin, langArray: jsonArray, time: time, error: error});
        });
    });

});
module.exports = router;
//

function getJSON(url, callback) {
    var fs = require('fs');
    fs.readFile(url, 'utf8', function (err, data) {
        if (data) {
            callback(data);
        } else {
            var err = "No files to compare, please upload files.";
            console.log(err + " on " + url + " (routes/index.js)");
            callback("", err);
        }
    });
}

function getTranslationArray(data) {
    if (!isArray(data)) {
        return data;
    }
    var arr = {};
    for (var i = 0; i < data.length; i++) {
        if (data[i].id) {
            arr[data[i].id] = data[i].translation;
        }
    }
    return arr;
}

function isArray(data) {
    if (Object.prototype.toString.call(data) === '[object Array]') {
        return true;
    }
    return false;
}

var jsonFiles = {};
function getFiles(paths, callback, fileNumber) {
    if ("undefined" == typeof fileNumber) {
        fileNumber = 0;
    } else {
        fileNumber++;
    }

    if (!paths[fileNumber]) {
        console.log("!paths[fileNumber] on " + fileNumber + " index")
        callback(jsonFiles);
        return;
    }
    
    if(paths[fileNumber][0] == "."){
        getFiles(paths, callback, fileNumber);
        return;
    }

    getJSON("public/json/" + paths[fileNumber], function (data) {
        //parse
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.log(e);
            getFiles(paths, callback, fileNumber);
            return;
        }
        data = getTranslationArray(data);

        var langName = paths[fileNumber];
        console.log("lang name = " + langName);
        if ("~origin.json" != langName) {
            jsonFiles[langName] = data;
        }
        getFiles(paths, callback, fileNumber);
    });
}
