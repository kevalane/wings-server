// Imports
const request = require('request');
const axios = require('axios');
const mongoose = require('mongoose');

// Validators
const cancelAutogiroController = require('../validators/cancel/cancelAutogiroValidator');

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

	const validation = cancelAutogiroValidator.validate(rawData);

	if (validation.error) {
		return res.status(400).send({err: validation.error.details[0].message});
	} else {
		// Successful validation, let's get the id
		User.findOne({email: validation.value.email}).then(user => {
			console.log(user);
			request({
				uri: configUrl + '/v1/contractinvoice/pause/' + user['public_id'],
				method: 'PUT',
				headers: headers
			}, (err, response, body) => {
				if (err) {
					return res.status(400).send({err: err.message});
				} else {
					var result = JSON.parse(body);
					console.log(result);
				}
			});
		}).catch(err => {
			return res.status(400).send({err: err.message});
		});
	}

}

module.exports = {
	cancel_getTest
}