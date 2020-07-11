import express from 'express';
import otherController from '../controllers/other.controller';

const otherApi = express.Router();

otherApi.route('/myapi/support')
    .post(otherController.sendToSupport);

export default otherApi;
