import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Author is required !']
    },

    genre: {
        type: String,
        required: [true, 'Genre is required !']
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

export default mongoose.model('Song', SongSchema);
