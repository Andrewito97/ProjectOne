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
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    },
    
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', PostSchema);