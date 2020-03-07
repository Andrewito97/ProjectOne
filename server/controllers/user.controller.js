import User from '../models/user.model';
import jsonWebToken from 'jsonwebtoken';
import expressJsonWebToken from 'express-jwt';
import config from '../../config';

const userController = {
    create(request, response) {
        const user = new User(request.body);
        user.save( (error, result) => {
            if(error) {
                response.status(400).json({ 
                    error 
                });
            } else {
                response.status(200).json({ 
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
                    accessToken, user: { 
                        _id: user._id, 
                        name: user.name, 
                        email: user.email, 
                }});
        });
    },
    logout(request, response) {
        response.clearCookie("token")
        return response.status(200).json({
          message: 'Signed out !'
        });
    },
    recoverPassword(request, response) {
        User.findOne({ 'email': request.body.email }, (error, user) => {
            if(error || !user) {
                return response.status(401).json({ 
                    emailError: 'This email is not registered !' 
                });
            };
            user.recoverPassword(request.body.email);
            return response.status(200).json({
                message: 'Password has been sent successfully on your email address !'
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
            error: "User is not authorized !"
          });
        };
        nextHandler();
    }
}

export default userController