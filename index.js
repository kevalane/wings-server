// Requires
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');

// Maybe not necessary
const queryString = require('query-string');
const axios = require('axios');

// Routes
const autogiroRoutes = require('./routes/autogiroRoutes');
const cancelRoutes = require('./routes/cancelRoutes');

// Process variables
var port = process.env.PORT;
var api_key = process.env.API_KEY;
var creditor_id = process.env.CREDITOR_ID;

// Route configs
var configUrl = 'https://apitest.billecta.com';
var apiUrl = '/api/';

// Mongodb configuration
mongooseOptions = {
	'user': 'admin',
	'pass': process.env.MONGO_PASSWORD,
	'auth': {
		'authSource': 'admin'
	},
	'keepAlive': true,
	'useNewUrlParser': true,
	'useFindAndModify': false,
	'useCreateIndex': true,
	'useUnifiedTopology': true
}
var mongooseConnectionString = 'mongodb://localhost:27017/wingsDB?authSource=admin';
mongoose.connect(mongooseConnectionString, mongooseOptions)
	.then(data => {
		console.log('Successfully connected to MongoDB.');
	})
	.catch(err => {
		console.log('There was an error connecting to MongoDB. Message: ' + err.message);
	});

// Middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Initiate app
app.listen(port, () => {
	console.log('Listening: ' + port);
});

// Test route
app.get('/', (req, res) => {
	res.send('Hello world');
});

// Routes middleware
app.use(apiUrl + 'autogiro', autogiroRoutes);
app.use(apiUrl + 'cancel', cancelRoutes);