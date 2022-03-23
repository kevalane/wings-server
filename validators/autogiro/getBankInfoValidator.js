const Joi = require('joi');

var bankInfoValidator = Joi.object().keys({
	amount: Joi.number()
		.min(50)
		.required(),

	ssn: Joi.string()
		.min(12)
		.max(13)
		.required(),

	email: Joi.string()
		.email()
		.max(150)
		.required(),

	bank: Joi.string()
		.max(20)
		.required(),

	otherDevice: Joi.boolean()
		.required()
});

module.exports = bankInfoValidator;