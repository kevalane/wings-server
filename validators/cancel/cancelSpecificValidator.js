const Joi = require('joi');

let cancelSpecificValidator = Joi.object().keys({
	email: Joi.string()
		.required()
		.max(100),

	ssn: Joi.string()
		.min(12)
		.max(13)
		.required(),

	publicId: Joi.string()
		.max(55)
		.required()
});

module.exports = cancelSpecificValidator;