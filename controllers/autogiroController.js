// Validators


const autogiro_getBankInfo = (req, res) => {

	console.log(req.body);
	
	var rawData = {
		amount: req.body.amount,
		ssn: req.body.ssn,
		email: req.body.email,
		bank: req.body.bank
	}

	res.send(rawData);
}

module.exports = {
	autogiro_getBankInfo
}