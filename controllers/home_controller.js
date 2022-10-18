//Home Controller

const Task = require("../models/task");

module.exports.home = function (req, res) {
Task.find({}, function (err, tasks) {
  if(err){
    console.log("Error in fetching the tasks", err);
    return;
  }

  return res.render("home", {
    title: "Swadesh's To Do List",
    task_list: tasks,
  });
});
};
