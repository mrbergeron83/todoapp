// Todo.js
var mongoose = require('mongoose');
               
var TodoSchema = new mongoose.Schema({
  item: String,
  done: { type: Boolean, default: false},
  deleted: { type: Boolean, default: false},
  date: { type: Date, default: Date.now }
});
mongoose.model('Todo', TodoSchema);
module.exports = mongoose.model('Todo');