import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required !'],
		validate: {
			validator: function(value) {
				if(value.length < 3) {
					this.invalidate('name', 'Name is too short !');
				}
				if(value.length > 20) {
					this.invalidate('name', 'Name is too long !');
				}
			}
		}
	},

	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required !'],
		// eslint-disable-next-line no-useless-escape
		match: [/.+\@.+\..+/, 'Please fill a valid email address !']
	},

	status: {
		type: String,
		required: true
	},

	hash : String, 

	salt : String,

	resetPasswordToken: {
		type: String,
		required: false
	},

	resetPasswordExpires: {
		type: Date,
		required: false
	},

	createdWithMedia: {
		type: String,
		default: 'none'
	},

}, {timestamps: true});

UserSchema
	.virtual('password')
	.set(function(password) {

		//castom validation
		if(!password) {
			this.invalidate('password', 'Password is required !');
		}
		if (password.length < 6) {
			this.invalidate('password', 'Password must be at least 6 characters !');
		}

		//creating a unique salt for a particular user 
		this.salt = crypto.randomBytes(16).toString('hex'); 
     
		//hashing user's salt and password with 1000 iterations, 64 length and sha512 digest 
		this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); 
	});

UserSchema.methods = {
	authenticate: function(requestedPassword) {
		let hash = crypto.pbkdf2Sync(requestedPassword, this.salt, 1000, 64, 'sha512').toString('hex');
		return this.hash === hash; 
	},
};

export default UserSchema;
