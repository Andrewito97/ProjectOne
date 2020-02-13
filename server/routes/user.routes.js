import express from 'express'
import userController from '../controllers/user.controller'

const userApi = express.Router()

userApi.route('/myapi/signup').post(userController.create)

export default userApi