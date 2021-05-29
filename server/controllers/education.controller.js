/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import formidable from 'formidable';
import EducationSchema from '../models/education.model';
import config from '../../config';

//create connection to specific database
const connection = mongoose.createConnection(config.educationMongoUri, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

//append specifid schema to the connection and initialize constructor
const Education = connection.model('Education', EducationSchema);

connection.once('open', function () {
	console.log('\x1b[32m', 'Connected to db with education documents !');
});

connection.on('error', (error) => {
	console.error('Unable to connect to database with education documents!');
	console.error(`Reason: ${error}`);
});

const educationController = {
	create(request, response) {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(request, (error, fields, files) => {
			if(error) {
				return response.status(400).json({
					errorMessage: 'Image could not be uploaded !'
				});
			}
			let educationDoc = new Education(fields);
			educationDoc.save((error, result) => {
				if(error) {
					return response.status(400).json({
						error
					});
				} else {
					return response.status(201).json({
						success: result
					});
				}  
			});
		});
	},

	getDocumentByTitle(request, response, nextHandler, docTitle) {
		Education
			.findOne({ title: docTitle})
			.exec( (error, doc) => {
				if(error || !doc) {
					return response.status(400).json({
						errorMessage: 'Document not found !'
					});
				}
				request.profile = doc;
				nextHandler();
			});
	},

	getDocumentData(request, response) {
		const document = {
			title: request.profile.title,
			text: request.profile.text
		};
		return response.json(document);
	},

	getAllDocuments(request, response) {
		Education
			.find()
			.exec( (error, docs) => {
				if(error) {
					return response.status(400).json({
						error
					});
				}
				response.json(docs);
			});
	},

	update(request, response) {
		Education 
			.findOneAndUpdate(
				{ title: request.profile.title }, 
				request.body, 
				{ runValidators : true },
				(error, oldDocument) => {
					if(error) {
						return response.status(401).json({
							error
						});
					} else {
						return response.status(201).json({
							success: 'Document has been updated !'
						});
					}
				}
			);
	},

	delete(request, response) {
		Education
			.findOneAndDelete({ title: request.profile.title }, (error) => {
				if(error) {
					return response.status(400).json({
						error
					});
				} else {
					return response.status(200).json({
						success: 'Document has been deleted !'
					});
				} 
			});
	}
};

export default educationController;
