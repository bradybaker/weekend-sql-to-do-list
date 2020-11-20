// Grab express
// This gives us the whole library
const express = require('express');

// Will need for POST requests
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/todo.router');
// this creates an instance of the express web server 
const app = express();

app.use('/todo', toDoRouter);

// Setup bodyParser - parses the body of the request 
// jquery $.ajex uses urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// axios will see with react in week 11, uses this below 
app.use(bodyParser.json());

// Set up static files service
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});