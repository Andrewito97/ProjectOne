import express from 'express';
import educationController from '../controllers/education.controller';

const educationApi = express.Router();

educationApi.route('/myapi/education')
	.get(educationController.getAllDocuments)
	.post(educationController.create);

educationApi.route('/myapi/education/:documentTitle')
	.get(educationController.getDocumentData)
	.put(educationController.update)
	.delete(educationController.delete);

educationApi.param('documentTitle', educationController.getDocumentByTitle);

export default educationApi;
