const Joi = require('joi');

var startAutogiroValidator = Joi.object().keys({
	email: Joi.string()
		.max(100)
		.required(),

	ssn: Joi.string()
		.min(12)
		.max(13)
		.required(),

	name: Joi.string()
		.max(100)
		.required(),

	clearingNumber: Joi.string()
		.max(10)
		.required(),

	accountNumber: Joi.string()
		.max(25)
		.required(),

	bank: Joi.string()
		.max(20)
		.required(),

	amount: Joi.number()
		.min(50)
		.required()
});

module.exports = startAutogiroValidator;