// Todo.js
var mongoose = require('mongoose');
var Moment = require('moment');               
var TodoSchema = new mongoose.Schema({
  item: String,
  done: { type: Boolean, default: false},
  deleted: { type: Boolean, default: false},
  date: { type: String, default: new Moment().format('L') }
});
mongoose.model('Todo', TodoSchema);
module.exports = mongoose.model('Todo');