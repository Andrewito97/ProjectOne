import mongoose from 'mongoose';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import config from '../../config';

function makeRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        validate: {
            validator: function(value) {
                if(value.length < 3) {
                    this.invalidate('name', 'Name is too short !')
                }
                if(value.length > 20) {
                    this.invalidate('name', 'Name is too long !')
                }
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address !']
    },
    hash : String, 
    salt : String,
    initialVector: String
});

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

    this.salt = makeRandomString(32);
    this.initialVector = makeRandomString(16);
     
    let encryptKey = crypto.createCipheriv('aes256', this.salt, this.initialVector);
    let encryptString = encryptKey.update(password, 'utf8', 'hex');
    this.hash = encryptString + encryptKey.final('hex');
});

UserSchema.methods = {
    authenticate: function(requestedPassword) {
        let encryptKey = crypto.createCipheriv('aes256', this.salt, this.initialVector);
        let encryptString = encryptKey.update(requestedPassword, 'utf8', 'hex');
        let hash = encryptString + encryptKey.final('hex');
        return hash === this.hash;
    },
    recoverPassword: function(requestedEmail) {
        let decryptKey = crypto.createDecipheriv('aes256', this.salt, this.initialVector);
        let decryptString = decryptKey.update(this.hash, 'hex', 'utf8');
        let password = decryptString + decryptKey.final('utf8');
        sgMail.setApiKey(config.sendgridKey);
        const message = {
            to: requestedEmail,
            from: 'oneproject.support@test.com',
            subject: 'Password Recovery',
            text: `Your password: ${password}`,
        };
        sgMail.send(message);
    }
};

export default mongoose.model('User', UserSchema);
