import express from 'express'
import userController from '../controllers/user.controller'

const userApi = express.Router()

userApi.route('/myapi/users').get(userController.showHi)

export default userApi