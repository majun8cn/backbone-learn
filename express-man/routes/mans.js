var express = require('express');
var router = express.Router();

// Set up MongoDB and create the Man model
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testData');
var Man = require('../models/man');

/* GET mans listing. http://localhost:3000/mans */
router.get('/', function(req, res) {
    Man.find(function(err, mans) {
        if (err)
            res.send(err);

        res.json(mans);
    });
});

/* POST mans create a new Man object. http://localhost:3000/mans */
router.put('/', function(req, res) {
    var man = new Man();
    man.name = req.body.name;
    man.age = req.body.age;

    man.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: "man created",
            id: man._id
        });
    });
});

/* GET one man object. http://localhost:3000/mans/id */
router.get('/:manid', function(req, res) {
    Man.findById(req.params.manid, function(err, man) {
        if (err)
            res.send(err);
        res.json(man);
    });
});

/* POST update one man object. http://localhost:3000/mans/id */
router.post('/:manid', function(req, res) {
    Man.findById(req.params.manid, function(err, man) {
        if (err)
            res.send(err);

        man.name = req.body.name;
        man.age = req.body.age;

        man.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: "man updated"
            });
        });

    });
});


/* DELETE one man object. http://localhost:3000/mans/id */
router.delete('/:manid', function(req, res) {
    Man.remove({
            _id: req.params.manid
        },
        function(err, man) {
            if (err)
                res.send(err);

            res.json({
                message: "man deleted"
            });
        });
});

module.exports = router;
