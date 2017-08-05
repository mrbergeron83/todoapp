// TodoController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Todo = require('./todo');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));



// CREATES A NEW TODO
router.post('/', function (req, res) {
    Todo.create({
        item: req.body.item,
        date: req.body.date,
        done: req.body.done,
        deleted: req.body.deleted
    },
        function (err, todo) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(todo);
        });
});

// RETURNS ALL THE UNDELETED TODOS IN THE DATABASE
router.get('/undeleted', function (req, res) {
    Todo.find({"deleted": false, "done": false}, function (err, todos) {
        if (err) return res.status(500).send("There was a problem finding the todos.");
        res.status(200).send(todos);
    });
});

// RETURNS ALL THE DONE TODOS IN THE DATABASE
router.get('/done', function (req, res) {
    Todo.find({"done": true, "deleted": false}, function (err, todos) {
        if (err) return res.status(500).send("There was a problem finding the todos.");
        res.status(200).send(todos);
    });
});

// RETURNS ALL THE DELETED TODOS IN THE DATABASE
router.get('/deleted', function (req, res) {
    Todo.find({"deleted": true}, function (err, todos) {
        if (err) return res.status(500).send("There was a problem finding the todos.");
        res.status(200).send(todos);
    });
});

// GETS A SINGLE TODO FROM THE DATABASE
router.get('/:id', function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) return res.status(500).send("There was a problem finding the todo.");
        if (!todo) return res.status(404).send("No todo found.");
        res.status(200).send(todo);
    });
});

// DESTROY A TODO FROM THE DATABASE
router.delete('/destroy', function (req, res) {
    Todo.findByIdAndRemove(req.body._id, function (err, todo) {
        if (err) return res.status(500).send("There was a problem destroying the todo.");
        res.status(200).send("todo: " + todo.item + " was deleted.");
    });
});

// UPDATES A SINGLE TODO IN THE DATABASE
router.put('/update', function (req, res) {

    Todo.findByIdAndUpdate(req.body._id, req.body, {
        new: true
    }, function (err, todo) {
        if (err) return res.status(500).send("There was a problem updating the todo.");
        res.status(200).send(todo);
    });
});

module.exports = router;