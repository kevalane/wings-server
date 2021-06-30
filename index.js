// Requires
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const request = require('request');

// Maybe not necessary
const queryString = require('query-string');
const axios = require('axios');

// Routes
const autogiroRoutes = require('./routes/autogiroRoutes');

// Process variables
var port = process.env.PORT;
var api_key = process.env.API_KEY;
var creditor_id = process.env.CREDITOR_ID;

// Route configs
var configUrl = 'https://apitest.billecta.com';
var apiUrl = '/api/';

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

// 4b101fd3-91eb-4bd6-adac-c314c293c781

// sendRequest('https://apitest.billecta.com/v1/creditors/creditor', 'PUT');
	
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

var obj = {
	"CreditorPublicId": '4b101fd3-91eb-4bd6-adac-c314c293c781',
	"Address": "test",
  	"Address2": "test2",
  	"ZipCode": null,
  	"City": null,
  	"Email": null,
  	"Phone": null,
  	"DebtorExternalId": null,
	"SSN": "20111111-5645",
	"Name": "Jesper Rasmusson",
	"ClearingNumber": "1234",
  	"AccountNumber": "12344560",
  	"Bank": "Swedbank",
  	"Amount": 100,
  	"WithdrawalDay": 27,
  	"EndDate": null,
  	"StartDate": null,
  	"EnableAutomaticReminder": false,
  	"EnableAutomaticDebtCollection": false
}

const headers = {
	Authorization: 'Basic ' + api_key,
	'Accept': 'application/json',
	'Content-Length': 0
}

// var obj1 = {
//   "CreditorPublicId": "4b101fd3-91eb-4bd6-adac-c314c293c781",
//   "OrgNo": "010414-4092",
//   "Name": "Nordicsell",
//   "CreditorBankInfo": {
//     "UsesClientFund": false,
//     "PaymentMethod": "BankGiro",
//     "BankgiroNo": "314134",
//     "BankgiroNoVerified": true,
//     "PlusgiroNo": "314134",
//     "AccountNo": "314134",
//     "ClearingNo": "314134",
//     "SwishPaymentEnabled": false,
//     "SwishNumber": null,
//     "AutogiroEnabled": true,
//     "AutogiroCustomerNumber": "314134",
//     "EInvoiceFUI": "123456789012.12345678901.BANK.SE",
//     "EInvoiceCUI": "1234567",
//     "ForeignAccounts": [
//       {
//         "CurrencyCode": "SEK",
//         "BankName": "SEB",
//         "Iban": "13984890489758957987487",
//         "Bic": "SWEDESS"
//       },
//       {
//         "CurrencyCode": "EUR",
//         "BankName": "SEB",
//         "Iban": "13984890489758957987487",
//         "Bic": "SWEDESS"
//       }
//     ],
//     "CreditorOutgoingBankgiroes": [
//       {
//         "BankgiroNo": "123-4567",
//         "IsActive": true,
//         "BankgiroApproved": true,
//         "Description": null,
//         "BookkeepingPaymentMeanCode": null
//       }
//     ],
//     "PaymentMethods": [
//       {
//         "Priority": "Primary",
//         "PaymentMethod": "BankGiro",
//         "BankgiroNo": "123-4567",
//         "PlusgiroNo": "314134",
//         "ClearingNo": "314134",
//         "AccountNo": "314134",
//         "IBAN": "314134",
//         "BIC": "314134",
//         "Verified": true
//       },
//       {
//         "Priority": "Alternative",
//         "PaymentMethod": "BankGiro",
//         "BankgiroNo": "123-1234",
//         "PlusgiroNo": "314134",
//         "ClearingNo": "314134",
//         "AccountNo": "314134",
//         "IBAN": "314134",
//         "BIC": "true",
//         "Verified": false
//       }
//     ]
//   },
//   "Attention": null,
//   "CareOf": null,
//   "Address": "The address 1",
//   "Address2": "Additional address",
//   "ZipCode": "11175",
//   "City": "Stockholm",
//   "CountryCode": "SE",
//   "Phone": "070-5656565",
//   "VatNumber": "SE551234564701",
//   "Residence": null,
//   "ApprovedCompanyTax": true,
//   "GLN": null,
//   "CreditorContact": {
//     "FirstName": "John",
//     "LastName": "Doe",
//     "Email": "john.doe@billecta.com",
//     "Phone": "070123456789"
//   },
//   "CreditorClaimsContact": null,
//   "CreditorSignatoryContact": null,
// 		"CreditorInvoiceAddress": {
// 	    "Address": "Rosenstigen",
// 	    "Address2": null,
// 	    "ZipCode": "14462",
// 	    "City": "Ronninge",
// 	    "CountryCode": "SE",
// 	    "Email": "acme@billecta.com",
// 	    "DeliveryMethod": "Email"
// 	  },
//   "IsEnabled": true,
//   "NextInvoiceNumber": "1023",
//   "LogoURL": null,
//   "UseCentRounding": false,
//   "UsesClientFundForInvoicing": false
// }


// axios.put('https://apitest.billecta.com/v1/creditors/creditor', obj1, {headers: headers})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// axios.post('https://apitest.billecta.com/v1/contractinvoice/monthlyrecurringautogiro', obj, {headers: headers})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		data: { PublicId: '8172318798' }
// 		the id when changing the autogiro in the future
// 	});