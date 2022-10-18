//Using MongoDB, Mongoose and Robo3T(Studio3T)(GUI for visualizing database) for the database creation



//Acquire the mongoose library
const mongoose = require('mongoose');

//Connect mongoose to the database that we want to create(contacts_list_db)
mongoose.connect("mongodb://localhost/todo_list_db");

//Acquire the connection in 'db' variable to check if it is successfully connected or not
const db = mongoose.connection;

//Throwing an error message on the cnsole if 'db' is not successfully connected to the database
db.on("error", console.error.bind(console, "Error connecting to db."));

//Once 'db' is open then throw a message that it is successfuly connected to the database
db.once("open", function(){
    console.log("Successfully connected to the database");
});

