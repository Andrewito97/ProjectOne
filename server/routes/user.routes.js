import express from 'express';
import userController from '../controllers/user.controller';

const userApi = express.Router();

userApi.route('/myapi/signup').post(userController.create);

userApi.route('/myapi/login').post(userController.login);

userApi.route('/myapi/logout').get(userController.logout);

userApi.route('/myapi/recover').post(userController.recoverPassword);

userApi.route('/myapi/reset/:email/:resetToken')
    .get(userController.getResetPasswordForm)
    .post(userController.resetPassword)

export default userApi;