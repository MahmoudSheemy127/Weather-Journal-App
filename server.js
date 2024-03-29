// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();



const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


//Handle Routes

app.get('/getData',(req,res) => {
    res.send(projectData);
    console.log("Get recieved");
})

app.post('/postData',(req,res) => {
    projectData = req.body;
    res.send("POST data");
    console.log(projectData);    
})
// Setup Server
const PORT = 8001;

const server = app.listen(PORT,() => {
    console.log("Server is running on port "+PORT);
});


