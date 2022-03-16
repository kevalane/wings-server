const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		required: true
	},
	ssn: {
		type: String,
		unique: false,
		required: true
	},
	email: {
		type: String,
		unique: false,
		required: true
	},
	name: {
		type: String,
		unique: false,
		required: true
	},
	clearingNumber: {
		type: String,
		unique: false,
		required: true
	},
	accountNumber: {
		type: String,
		unique: false,
		required: true
	},
	bank: {
		type: String,
		unique: false,
		required: true
	},
	amount: {
		type: Number,
		unique: false,
		required: true
	},
	public_id: {
		type: String,
		unique: false,
		required: true
	},
	creditor_id: {
		type: String,
		unique: false,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	}
});

UserSchema.pre('save', function (next) {
	let user = this;
	bcrypt.hash(user.ssn, 10, (err, hash) => {
		if (err) {
			return next(err);
		}
		user.ssn = hash;
		next();
	});
});

var User = mongoose.model('User', UserSchema);
module.exports = User;