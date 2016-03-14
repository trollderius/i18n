var express = require('express');
var fs = require("fs");
var formidable = require('formidable');
var router = express.Router();

router.post('/', function (req, res) {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
//        res.writeHead(200, {'content-type': 'text/plain'});
//        res.write('received upload:\n\n');

        //Rename the file to its original name
        fs.rename(files.origin.path, __dirname + "/../public/json/~origin.json", function (err) {
            if (err)
                throw err;
            console.log('renamed complete');

            //Rename the file to its original name
            fs.rename(files.lang.path, __dirname + "/../public/json/" + files.lang.name, function (err) {
                if (err)
                    throw err;
                console.log('renamed complete');
            });

            res.redirect("/");
        });

    });

});

module.exports = router;
