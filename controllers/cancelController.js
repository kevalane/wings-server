// Imports
const request = require('request');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Validators
const cancelAutogiroValidator = require('../validators/cancel/cancelAutogiroValidator');
const cancelSpecificValidator = require('../validators/cancel/cancelSpecificValidator');

// Models
const User = require('../models/user.js');

// Global vars
var configUrl = 'https://api.billecta.com';
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

	console.log(rawData);

	const validation = cancelAutogiroValidator.validate(rawData);

	if (validation.error) {
		console.log(validation.error);
		return res.status(400).send({err: validation.error.details[0].message});
	} else {
		// Successful validation, let's get the id
		User.find({email: validation.value.email.toLowerCase(), active: true
		}).then(users => {
			console.log(users);
			if (users.length == 0) {
				return res.status(400).send({err: 'Kunde inte hitta något autogiro med angiven email.'});
			} else {
				// Fix ssn so its without the dash
				let raw = validation.value.ssn.toString();
				changed = raw.replace('-', '');

				// Check ssn of the first one, they should have the same on all..
				bcrypt.compare(changed, users[0].ssn, (err, result) => {
					if (err) {
						console.log("we are here" + err);
						return res.status(400).send({err: 'Kunde inte hitta något autogiro med ditt personnummer. Kontakta oss.'});
					} else {
						if (result) {
							// It's correct. send all autogiros
							return res.status(200).send({success: true, users: users});
						} else {
							console.log(result);
							return res.status(400).send({err: 'Kunde inte hitta något autogiro med ditt personnummer. Kontakta oss.'});
						}
					}
				});
			}
		}).catch(err => {
			console.log(err);
			return res.status(400).send({err: err.message});
		});
	}
}

const cancel_cancelSpecificAutogiro = (req, res) => {
	let rawData = {
		email: req.body.email,
		ssn: req.body.ssn,
		publicId: req.body.publicId
	}

	const validation = cancelSpecificValidator.validate(rawData);

	if (validation.error) {
		return res.status(400).send({err: validation.error.details[0].message});
	} else {
		// Find the specific autogiro
		User.findOne({public_id: validation.value.publicId}).then(user => {
			// Check ssn again
			let raw = validation.value.ssn.toString();
			changed = raw.replace('-', '');

			bcrypt.compare(changed, user.ssn, (err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).send({err: 'Kunde inte hitta något autogiro med ditt personnummer. Kontakta oss.'});
				} else {
					if (result) {
						// It's correct, here we should delete it
						request({uri: configUrl + '/v1/contractinvoice/pause/' + user['public_id'], method: 'PUT', headers: headers}, (err, response, body) => {
							if (err) {
								console.log(err);
								return res.status(400).send({err: err.message});
							} else {
								User.updateOne({public_id: validation.value.publicId}, {$set: {active: false}}).then(response => {
									return res.status(200).send({success: true, msg: 'Autogirot är nu uppsagt.'})
								}).catch(err => {
									console.log(err);
									return res.status(400).send({err: 'Autogiro pausat men kvar i databasen. Vänligen kontakta oss.'});
								})
							}
						});
					} else {
						console.log(err);
						return res.status(400).send({err: 'Kunde inte hitta något autogiro med ditt personnummer. Kontakta oss.'});
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			return res.status(400).send({err: 'Vi lyckades inte hitta autogirot. Vänligen kontakta oss.'});
		});
	}
}

module.exports = {
	cancel_cancelAutogiro,
	cancel_cancelSpecificAutogiro
}