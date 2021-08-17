// Imports
const request = require('request');
const axios = require('axios');
const mongoose = require('mongoose');

// Global vars
var configUrl = 'https://apitest.billecta.com';
var creditor_id = process.env.CREDITOR_ID;
var api_key = process.env.API_KEY;
var headers = {
	Authorization: 'Basic ' + api_key,
	'Accept': 'application/json',
	'Content-Length': 0
}

// Test route
const cancel_cancelAutogiro = (req, res) => {
	var rawData = {
		email: req.body.email
	}

	
}

module.exports = {
	cancel_getTest
}