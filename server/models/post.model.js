import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required !']
	},

	image: {
		// eslint-disable-next-line no-undef
		data: Buffer,
		contentType: String
	},

	text: {
		type: String,
		required: [true, 'Text is required !']
	},

	postedBy: {
		type: String, 
		required: [true, 'Author is required !']
	},
    
	created: {
		type: Date,
		default: Date.now
	}
});

PostSchema.index({title: 'text'});

export default mongoose.model('Post', PostSchema);