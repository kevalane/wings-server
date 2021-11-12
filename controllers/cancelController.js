// Imports
const request = require('request');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
		User.find({email: validation.value.email
		}).then(users => {
			if (!users) {
				return res.status(400).send({err: 'Kunde inte hitta något autogiro med angiven email.'});
			} else {
				// Fix ssn so its without the dash
				let raw = validation.value.ssn.toString();
				changed = raw.replace('-', '');

				// Check ssn of the first one, they should have the same on all..
				bcrypt.compare(changed, users[0].ssn, (err, result) => {
					if (err) {
						console.log(err);
						return res.status(400).send({err: 'Kunde inte hitta något autogiro med ditt personnummer. Kontakta oss.'});
					} else {
						if (result) {
							// It's correct. send all autogiros
							console.log(result);
							return res.status(200).send({success: true, users: users});
						} else {
							console.log(result);
							return res.status(400).send({err: 'Kunde inte hitta något autogiro med ditt personnummer. Kontakta oss.'});
						}
					}
				});
			}
		}).catch(err => {
			return res.status(400).send({err: err.message});
		});
	}
}

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

module.exports = {
	cancel_cancelAutogiro
}