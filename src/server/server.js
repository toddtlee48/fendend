// Setup empty JS object to act as endpoint for all routes
let projectData = [];
let pix_url = 'https://pixabay.com';
const dotenv = require('dotenv');
dotenv.config();
//const pix_api = process.env.PIX_KEY;
const pix_api = "15530826-07180118e4f2b2ecea228fbb3";
console.log(process.env.PIX_KEY)

const fetch = require('node-fetch');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/dist/index.html'); // change the path to your index.html
});

// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
	console.log("server running");
	console.log(`running on localhost: ${port}`);
}

//Get request
app.get('/all', (req, res) => {
	console.log('Get data');
	res.send(projectData);
});

app.get('/add', (req, res) => {
	console.log('Get add data');
	res.send(projectData);
});

//Post request
app.post('/add', (req, res) => {
	freshData = {
		name: req.body.name,
		lat: req.body.lat,
		lon: req.body.lon,
		country: req.body.country
	};
	projectData.push(freshData);
	res.send(projectData);
    console.log('Post received');
    res.end();
});

//Getting weather information using the lat and lon from app.js
app.get('/weather/:latlon', async (req, res) => {
	const latlon = req.params.latlon.split(',');
	console.log(latlon);
	const lat = latlon[0];
	const lon = latlon[1];
	console.log(lat, lon);
	const weather_url = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=21085ab4259b4b6a8c7639d211666b56&units=imperial`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    const data = {
    	weather: weather_data
    };
    res.json(data);
});

//Getting the image information 
 app.get('/image/:name', async (req, res) => {
 	const name = req.params.name;
 	const pixabay_url = `${pix_url}/api/?key=${pix_api}&q=${name}&category=places`;
    const pix_response = await fetch(pixabay_url);
    const pix_data = await pix_response.json();
    const pix = {
    	image: pix_data
    };
    res.json(pix);
});

module.exports = server

