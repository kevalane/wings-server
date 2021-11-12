// Imports
const request = require('request');
const axios = require('axios');
const mongoose = require('mongoose');

// Validators
const cancelAutogiroValidator = require('../validators/cancel/cancelAutogiroValidator');

// Models
const User = require('../models/user.js');

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
		email: req.body.email,
		ssn: req.body.ssn
	}

	const validation = cancelAutogiroValidator.validate(rawData);

	if (validation.error) {
		return res.status(400).send({err: validation.error.details[0].message});
	} else {
		// Successful validation, let's get the id
		User.find({email: validation.value.email}).then(users => {
			// They might have multiple autogiros, let's let them decide which to cancel
			return res.status(200).send({success: true, users: users});
			// Check if the ssn is correct


			// request({
			// 	uri: configUrl + '/v1/contractinvoice/pause/' + user['public_id'],
			// 	method: 'PUT',
			// 	headers: headers
			// }, (err, response, body) => {
			// 	if (err) {
			// 		return res.status(400).send({err: err.message});
			// 	} else {
			// 		// var result = JSON.parse(body);
			// 		console.log(body);
			// 	}
			// });
		}).catch(err => {
			return res.status(400).send({err: err.message});
		});
	}

}

module.exports = {
	cancel_cancelAutogiro
}