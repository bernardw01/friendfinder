var express = require('express');
var dataLayer = require('./dataLayer');

var router = express.Router();
var dl = new dataLayer();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET matches */
router.get('/get_matches', function (req, res, next) {
    //TODO Add functionality to get the list of potentials
    dl.getMatches({
            gender: req.query.gender
        },
        function (SQLres) {
            res.send(SQLres);
        });
});

/* GET Profile */
router.get('/get_profile_by_id', function (req, res, next) {
    //TODO Add functionality to get profile by ID
    res.json({"foo": "Bar"});
});

module.exports = router;
