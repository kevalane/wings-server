const Joi = require('joi');

var cancelAutogiroValidator = Joi.object().keys({
	email: Joi.string()
		.required()
		.max(100)
});

module.exports = cancelAutogiroValidator;