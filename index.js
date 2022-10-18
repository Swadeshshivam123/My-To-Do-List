//Importing express JS(installed)
const express = require("express");

//Importing path(built-in)
const path = require("path");

//Importing body-parser(installed)
const bodyParser = require("body-parser");

//Declaring and initializing port no for localhost
const port = 7867;

//Importing 'mongoose.js' file from 'config' folder to connect it to the database
const db = require('./config/mongoose');

//Importing 'task.js' file from 'models' folder into the collection 'Task' to store the ToDo list details
const Worklist = require('./models/task');
const Task = require("./models/task");

//Exporting expressJS in "app" variable
const app = express();

//Setting "ejs" as the "view engine"('template engine').
app.set("view engine", "ejs");

//Specifying path of "views"
app.set("views", './views');

//Specifying routes
app.use("/", require('./routes/index'));

//Using bodyParser to encode the data fethed from the form.
//First middleware
//It takes the data sent from the form and parses it into keys and values and updates it into req.body
app.use(bodyParser.urlencoded({ extended: false }));

//Accessing static files like images, css and js files kept in their respective sub-folders inside "assets" folder
app.use(express.static("assets"));

//Creating a task and pushing it into the database collection 'Task'.
  app.post("/create-task", (req, res) => {
  //Pushing the individual tasks obtained from the todo-form into the database

  Task.create(
    {
        task: req.body.description,
        category: req.body.category,
        date: req.body.date,
    },
    function (err, tasks){
        if(err){
            console.log("Error in creating a task");
            return;
        }
        // rendering back to the home page
        console.log("**********", tasks);
        res.redirect("back");
    }
  );
  });
  
//Deleting the tasks which are checked on the checkbox
  // app.post("/delete-task", (req, res) => {
  //   console.log(req.body);
  
  //   let tasks = Object.keys(req.body);
  
  //   for (task of tasks) {
  //     // mongoose to delete the tasks
  //     Task.deleteOne({ _id: task }, function (err) {
  //       if (err) {
  //         console.log("Error in deleting from database.", err);
  //         return;
  //       }
  //     });
  //   }
  //   return res.redirect("back");
  // });

  app.post("/delete-task", (req, res) => {
    console.log(req.body);

    let tasks = Object.keys(req.body);

    for (task of tasks) {
    //Using mongoose to delete the checked tasks
    Task.deleteOne({ _id: task }, function(err) {
        if(err){
            console.log("Error in deleting the selected tasks from the database.", err);
            return;
        }
    });
    }
    //Redirecting back to the same page after updating the database
    return res.redirect("back");

  });


//Displaying and error handling if the server is working fine or not.
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server ", err);
    return;
  }
  console.log("Yup.! My express server is up and running on the port: ", port);
});
