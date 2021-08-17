// Permanent marker heading 1
// Raleway brödtext
// h4 font-weight 500
// brördtext 400



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








// Get creditor id
// sendRequest(configUrl + '/v1/creditors/creditorsubs', 'GET')

// Step 1: make creditor call, get public id 
// Step 2 start inteval of public id that retrieved


// HOW TO RETRIEVE ALL THE DATA
// var bank = 'SEB';
// var ssn = '19800113-9297'
// 	var public_id = res.PublicId;




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