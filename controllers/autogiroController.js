// Imports
const request = require('request');
const axios = require('axios');

// Validators
const getBankInfoValidator = require('../validators/autogiro/getBankInfoValidator');
const pollBankInfoValidator = require('../validators/autogiro/pollBankInfoValidator');
const startAutogiroValidator = require('../validators/autogiro/startAutogiroValidator')

// Global vars
var configUrl = 'https://apitest.billecta.com';
var creditor_id = process.env.CREDITOR_ID;
var api_key = process.env.API_KEY;
var headers = {
	Authorization: 'Basic ' + api_key,
	'Accept': 'application/json',
	'Content-Length': 0
}

// Initiate retrieval of bank info
const autogiro_getBankInfo = (req, res) => {

	var rawData = {
		amount: req.body.amount,
		ssn: req.body.ssn,
		email: req.body.email,
		bank: req.body.bank
	}

	const validation = getBankInfoValidator.validate(rawData);
	
	if (validation.error) {
		return res.send({err: validation.error.details[0].message});
	} else {
		// Successful validation, lets create the request
		request({
			uri: configUrl + '/v1/bank/accounts/' + creditor_id + '?bank=' + validation.value.bank + '&ssn=' + validation.value.ssn + '',
			method: 'POST',
			headers: headers
		}, function (err, response, body) {
			if (err) {
				return res.send({err: err.message});
			} else {
				var result = JSON.parse(body);	
				if (result['PublicId']) {
					return res.send({success: true, msg: result['PublicId']});
				} else {
					return res.send({err: 'An unknown error occured trying to initiate BankID request.'});
				}
			}
		});
	}
}

// Polling during the users authentication process
const autogiro_pollBankInfo = (req, res) => {

	var rawData = {
		publicId: req.body.publicId
	}

	const validation = pollBankInfoValidator.validate(rawData);

	if (validation.error) {
		return res.send({err: validation.error.details[0].message});
	} else {
		var interval = setInterval(function () {
			request({
				uri: configUrl + '/v1/bank/accounts/' + validation.value.publicId + '',
				method: 'GET',
				headers: headers
			}, function (err, response, body) {
				if (err) {
					clearInterval(interval);
					return res.send({err: err.message});
				} else {
					var result = JSON.parse(body);
					console.log(result);
					if (result['Status'] == 'Waiting') {
						// Send qr, needs to be implemented
						if (result['QR']) {
							clearInterval(interval);
							return res.send({qr: result['QR'], publicId: validation.value.publicId, status: 'Waiting'});
						}
					} else if (result['Status'] == 'Success') {
						clearInterval(interval);
						return res.send({success: true, accounts: result['AccountNumbers']});
					} else if (result['Status'] == 'Failed') {
						clearInterval(interval);
						return res.send({err: 'Legitimering via mobilt BankID misslyckades. Vänligen försök igen.'});
					} else {
						clearInterval(interval);
						return res.send({err: 'Ett okänt fel vid legitimering inträffade.'});
					}
				}
			});
		}, 1000);
	}
}

// Finalize, and actually start the autogiro
const autogiro_startAutogiro = (req, res) => {

	var rawData = {
		email: req.body.email,
		ssn: req.body.ssn,
		name: req.body.name,
		clearingNumber: req.body.clearingNumber,
		accountNumber: req.body.accountNumber,
		bank: req.body.bank,
		amount: req.body.amount
	}

	const validation = startAutogiroValidator.validate(rawData);

	if (validation.error) {
		return res.send({err: validation.error.details[0].message});
	} else {
		var obj = {
			"CreditorPublicId": creditor_id,
			"Email": validation.value.email,
			"SSN": validation.value.ssn,
			"Name": validation.value.name,
			"ClearingNumber": validation.value.clearingNumber,
			"AccountNumber": validation.value.accountNumber,
			"Bank": validation.value.bank,
			"Amount": validation.value.amount,
			"WithdrawalDay": 27
		}
		axios.post(configUrl + '/v1/contractinvoice/monthlyrecurringautogiro', obj, {headers: headers})
		.then((result) => {
			return res.send({success: true, data: result['data']});
		})
		.catch((err) => {
			return res.send({err: err.message});
		})
	}
}

module.exports = {
	autogiro_getBankInfo,
	autogiro_pollBankInfo,
	autogiro_startAutogiro
}