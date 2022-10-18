//Importing monggose library
const mongoose = require("mongoose");

//Creating a schema for the ToDo list with attributes 'task', 'category' and 'date' having below mentioned properties
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

//Creating Model with name 'Task' for the schema(todoSchema)
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;