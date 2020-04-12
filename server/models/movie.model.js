import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    description: {
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

export default mongoose.model('Movie', MovieSchema);
