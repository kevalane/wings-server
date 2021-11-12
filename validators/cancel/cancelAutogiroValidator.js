const Joi = require('joi');

var cancelAutogiroValidator = Joi.object().keys({
	email: Joi.string()
		.required()
		.max(100),

	ssn: Joi.string()
		.min(12)
		.max(13)
		.required()
});

module.exports = cancelAutogiroValidator;