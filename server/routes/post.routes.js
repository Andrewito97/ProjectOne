import express from 'express'
import postController from '../controllers/post.controller'

const postApi = express.Router()

postApi.route('/myapi/posts').get(postController.showHi)

export default postApi