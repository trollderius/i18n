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
    getFiles(files, function (jsonArray) {

        //original
        getJSON("public/json/origin.json", function (origin, err) {
            console.log("error:  " + err)
            if (err) {
                error += err;
            }

            if (origin) {
                //parse
                try {
                    origin = JSON.parse(origin);
                } catch (e) {
                    console.log(e);
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
            var err = "no data or missing file: " + url;
            console.log(err + " (routes/index.js)");
            callback(false, err);
        }
    });
}

function getTranslationArray(data) {
    if (!isArray(data)) {
        return data;
    }
    var arr = {};
    for (var i = 0; i < data.length; i++) {
        arr[data[i].id] = data[i].translation;
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
    if("undefined" == typeof fileNumber){
        fileNumber = 0;        
    }else{
        fileNumber++;
    }    

    if (!paths[fileNumber]) {
        callback(jsonFiles);
        return;
    }
    
    getJSON("public/json/" + paths[fileNumber], function (data) {
        //parse
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.log(e);
            callback(false, e);
            return;
        }
        data = getTranslationArray(data);

        var fileName = paths[fileNumber];
        if (fileName && fileName.indexOf("lang_") != -1) {
            var langArray = fileName.split("lang_");
            var langName = langArray[langArray.length - 1].split(".json")[0];
            jsonFiles[langName] = data;
            getFiles(paths, callback, fileNumber);
            return;
        }
        
        callback(jsonFiles);
    });
}
