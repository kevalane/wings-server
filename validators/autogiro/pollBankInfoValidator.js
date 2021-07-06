const Joi = require('joi');

var bankInfoValidator = Joi.object().keys({
	publicId: Joi.string()
		.required()
		.max(100)
});

module.exports = bankInfoValidator;