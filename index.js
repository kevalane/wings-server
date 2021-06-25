// Requires
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const request = require('request');

// Maybe not necessary
const queryString = require('query-string');
const axios = require('axios');

// Process variables
var port = process.env.PORT;
var api_key = process.env.API_KEY;
var creditor_id = process.env.CREDITOR_ID;

var configUrl = 'https://apitest.billecta.com';

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.listen(port, () => {
	console.log('Listening: ' + port);
});


function sendRequest(url, method) {
	var options = {
		uri: url,
		method: method,
		headers: {
			Authorization: 'Basic ' + api_key,
			'Accept': 'application/json',
			'Content-Length': 0
		}
	}

	request(options, function (err, response, body) {
		// console.log(response);
		console.log(body);
		console.log(err);
	});
}

// sendRequest('https://apitest.billecta.com/v1/authentication/securetoken', 'GET');
	
// sendRequest(configUrl + '/v1/contractinvoice/monthlyrecurringautogiro', 'POST');

// Get creditor id
// sendRequest(configUrl + '/v1/creditors/creditorsubs', 'GET')

// Step 1: make creditor call, get public id 
// Step 2 start inteval of public id that retrieved
// HOW TO RETRIEVE ALL THE DATA
// var bank = 'SEB';
// var ssn = '19800113-9297'
// request({
// 	uri: configUrl + '/v1/bank/accounts/' + creditor_id + '?bank=' + bank + '&ssn=' + ssn + '',
// 	method: 'POST',
// 	headers: {
// 		Authorization: 'Basic ' + api_key,
// 		'Accept': 'application/json',
// 		'Content-Length': 0
// 	}
// },
// function (err, response, body) {
// 	var res = JSON.parse(body);
// 	console.log(res);
// 	console.log(res.PublicId);

// 	var public_id = res.PublicId;

// 	setInterval(function () {
// 		sendRequest(configUrl + '/v1/bank/accounts/' + public_id + '', 'GET');
// 	}, 1000)
// }
// )
// obj = {
//   "CreditorPublicId": '4b101fd3-91eb-4bd6-adac-c314c293c781',
//   "DebtorExternalId": null,
//   "OrgNo": "556888-5645",
//   "Name": "Jenny Doe",
//   "Attention": null,
//   "CareOf": null,
//   "Address": "Address 1",
//   "Address2": null,
//   "ZipCode": "11175",
//   "City": "Helsinki",
//   "CountryCode": "FI",
//   "CitizenshipCountryCode": "SE",
//   "Phone": null,
//   "Email": "invoice@billecta.com",
//   "ContactName": "Jenny Doe",
//   "ContactEmail": "Jenny.Doe@billecta.com",
//   "VatNumber": "SE556888564501",
//   "DebtorNo": null,
//   "GLN": null,
//   "IsActive": null,
//   "ProtectedIdentity": false,
//   "DebtorType": "Company",
//   "Intermediator": null,
//   "EInvoiceBank": null,
//   "Notes": null,
//   "DebtorSelfInvoiceInfo": null,
//   "DefaultActionConfig": null,
//   "Autogiro": {
//     "Active": true,
//     "AccountNo": "123456789",
//     "ClearingNo": "1234",
//     "Stage": "Approved",
//     "PayerNumber": "5568885645",
//     "PaymentServiceSupplier": "SEB",
//     "AutogiroFirstWithdrawalDate": "2021-06-26T20:59:01.864227+00:00"
//   },
//   "CreditCards": null,
//   "Created": "0001-01-01T00:00:00"
// };


// SETUP AUTOGIRO	
// var obj = {
// 	"CreditorPublicId": '4b101fd3-91eb-4bd6-adac-c314c293c781',
// 	"OrgNo": "556888-5645",
// 	"Name": "Jenny Doe"
// }

// const headers = {
// 	Authorization: 'Basic ' + api_key,
// 	'Accept': 'application/json',
// 	'Content-Length': 0
// }

// axios.post('https://apitest.billecta.com/v1/debtors/debtor', obj, {headers: headers})
// 	.then((res) => {
// 		console.log(res);
// 		var debtor_id = res.data.PublicId;
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// DEBTOR PUBLIC ID : 0a3ee027-f1ec-4049-bec1-3e1394a8abaa