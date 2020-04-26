import User from '../models/user.model';
import jsonWebToken from 'jsonwebtoken';
import expressJsonWebToken from 'express-jwt';
import config from '../../config';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';

const userController = {
    create(request, response) {
        const user = new User(request.body);
        user.save( (error, result) => {
            if(error) {
                response.status(401).json({ 
                    error 
                });
            } else {
                response.status(201).json({ 
                    message: 'Successfully signed up !' 
                });
            };
        });
    },

    login(request, response) {
        User.findOne({ 'email': request.body.email }, (error, user) => {
            if(error || !user) {
                return response.status(401).json({ 
                    emailError: 'User not found !' 
                });
            }
            if(!user.authenticate(request.body.password)) {
                return response.status(401).json({ 
                    passwordError: 'Wrong password !' 
                });
            }
            const accessToken = jsonWebToken.sign({ _id: user._id }, config.jwtSecret );
            response.cookie('token', accessToken, { expire: new Date() + 9999 });
            return response.json({ 
                    accessToken, 
                    user: { 
                        _id: user._id, 
                        name: user.name, 
                        email: user.email, 
                    }
            });
        });
    },

    checkIfMediaAccExists(request, response) {
        User.findOne({ 'email': request.body.email }, (error, user) => {
            if(error || !user) {
                return response.json({ 
                    notExist: 'User not found !' 
                });
            };
            if(user.createdWithMedia === 'google') {
                return response.json({ 
                    isGoogleAccount: 'User is created with google auth !' 
                });
            } else if(user.createdWithMedia === 'facebook') {
                return response.json({ 
                    isFacebookAccount: 'User is created with facebook auth !' 
                });
            } else {
                return response.json({ 
                    isNotMediaAccount: 'User is created without google or facebook auth !' 
                });
            }
        });
    },

    logout(request, response) {
        response.clearCookie("token")
        return response.status(200).json({
          message: 'Signed out !'
        });
    },

    recoverPassword(request, response) {
        User.findOne({email: request.body.email}, (error, user) => {
            if(error || !user) {
                return response.status(401).json({
                    emailError: 'This email is not registered !' 
                });
            };

            //generate and set password reset token
            user.resetPasswordToken = crypto.randomBytes(16).toString('hex');
            user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

            //save the updated user object
            user.save((error, user) => {
                if(error) {
                    return response.status(500).json({
                        emailError: error.message
                    });
                };
            });

            //send email
            sgMail.setApiKey(config.sendgridKey);
            let link = `http://${request.headers.host}/myapi/reset/${user.email}/${user.resetPasswordToken}`;
            const mailOptions = {
                to: user.email,
                from: 'oneproject.support@test.com',
                subject: "Password change request",
                text: `Hi ${user.name}, please click on the following link to reset your password: ${link}`,
            };
            sgMail.send(mailOptions);
            return response.status(200).json({
                message: 'Link has been sent successfully !'
            });
        });

    },

    getResetPasswordForm(request, response) {
        User.findOne({
                email:request.params.email, 
                resetPasswordToken: request.params.resetToken, 
                resetPasswordExpires: {$gt: Date.now()}
            })
            .exec((error, user) => {
                if(error || !user) {
                    return response.status(401).json({
                        message: 'Password reset token is invalid or has expired.'
                    });
                };
                //Redirect user to form with the email address
                let link = `http://${request.headers.host}/reset/${request.params.email}/${request.params.resetToken}`
                response.redirect(301, link)
            });
    },

    resetPassword(request, response) {
        User.findOne({
                email:request.params.email, 
                resetPasswordToken: request.params.resetToken, 
                resetPasswordExpires: {$gt: Date.now()}
            })
            .exec((error, user) => {
                //recheck if token is still valid
                if(error || !user) {
                    return response.status(401).json({
                        passwordError: 'Password reset token is invalid or has expired.'
                    });
                    
                //custom password validation
                } else if(!request.body.password) {
                    return response.status(401).json({
                        passwordError: 'Password is required !'
                    });
                } else if(request.body.password.length < 6) {
                    return response.status(401).json({
                        passwordError: 'Password must be at least 6 characters !'
                    });
                } else if(request.body.password !== request.body.confirmedPassword) {
                    return response.status(401).json({
                        passwordError: 'Passwords do not match !'
                    });
                }

                //set new password
                user.password = request.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save( (error, result) => {
                    if(error) {
                        response.status(400).json({ 
                            error 
                        });
                    } else {
                        response.status(200).json({ 
                            message: 'Password successfully changed !' 
                        });
                    };
                });
            });
    },

    requireSignin() {
        return expressJsonWebToken({
            secret: config.jwtSecret,
            userProperty: 'auth'
        });
    },

    hasAuthorization (request, response, nextHandler) {
        const authorized = request.profile && request.auth && request.profile._id == req.auth._id;
        if (!authorized) {
          return response.status(403).json({
            error: 'User is not authorized !'
          });
        };
        nextHandler();
    }
}

export default userController;
