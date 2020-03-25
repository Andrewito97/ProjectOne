import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    text: {
        type: String,
        required: true
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