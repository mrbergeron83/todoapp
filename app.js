var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    config = require('./config'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    Todo = require('./todo/todo'),
    TodoController = require('./todo/todoController');



var promise = mongoose.connect(config.url, {
    useMongoClient: true,
});
router.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/todos', TodoController);
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile('/public/index.html', { root: '.' });
});
app.get('/todolist', function (req, res) {
    res.sendFile('/public/index.html', { root: '.' });
});
app.get('/done', function (req, res) {
    res.sendFile('/public/index.html', { root: '.' });
});
app.get('/deleted', function (req, res) {
    res.sendFile('/public/index.html', { root: '.' });
});

app.listen(config.port, config.ip, function () {
    console.log("server running on port " + config.port);
});