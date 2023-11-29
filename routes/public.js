var express = require('express');

var router = express.Router();
const path = require("path");
console.log("Public: variables declared.");

router.get('/', function(req, res, next) {
    console.log("Public: / started!");

    res.sendFile(path.resolve('public/index.html') );

    console.log("Public: / done!");
});

router.get('/*', function(req, res, next) {
    console.log("Public: /* started!");

    res.sendFile(path.resolve('public/' + req.url) );

    console.log("Public: /* done!");
});



module.exports = router;