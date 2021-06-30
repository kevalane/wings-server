const Joi = require('joi');

var bankInfoValidator = Joi.object().keys({
	amount: Joi.number()
		.min(50)
		.required(),

	ssn: Joi.string()
		.min(12)
		.max(12)
		.required(),

	email: Joi.email()
		.max(150)
		.required(),

	bank: Joi.string()
		.max(20)
		.required()
});

module.exports = bankInfoValidator;