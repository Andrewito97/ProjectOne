import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required !']
    },

    image: {
        data: Buffer,
        contentType: String
    },

    text: {
        type: String,
        required: [true, 'Title is required !']
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

export default mongoose.model('Post', PostSchema);