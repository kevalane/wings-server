// Imports
const request = require('request');

// Validators
const getBankInfoValidator = require('../validators/autogiro/getBankInfoValidator');
const pollBankInfoValidator = require('../validators/autogiro/pollBankInfoValidator');

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
		setInterval(function () {
			request({
				uri: configUrl + '/v1/bank/accounts/' + validation.value.publicId + '',
				method: 'GET',
				headers: headers
			}, function (err, response, body) {
				if (err) {
					clearInterval();
					return res.send({err: err.message});
				} else {
					var result = JSON.parse(body);
					console.log(result);
					console.log(result['Status']);

					if (result['Status'] == 'Waiting') {
						console.log('Waiting');

						// Send qr
						if (result['QR']) {
							console.log(result['QR']);
						}
					} else if (result['Status'] == 'Success') {
						return res.send({success: true, accounts: result['AccountNumbers']});
					}
				}
			});
		}, 1000);
	}

}

module.exports = {
	autogiro_getBankInfo,
	autogiro_pollBankInfo
}