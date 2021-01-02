import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required !']
	},

	author: {
		type: String,
		required: [true, 'Author is required !']
	},

	genre: {
		type: String,
		required: [true, 'Genre is required !']
	},

	description: {
		type: String,
		required: [true, 'Description is required !']
	},

	image: {
		// eslint-disable-next-line no-undef
		data: Buffer,
		contentType: String
	},

	postedBy: {
		type: String, 
		required: [true, 'User author is required !']
	},
    
	created: {
		type: Date,
		default: Date.now
	}
});

BookSchema.index({title: 'text', author: 'text', genre: 'text'});

export default BookSchema;
