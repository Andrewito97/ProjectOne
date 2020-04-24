import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Author is required !']
    },

    genre: {
        type: String,
        required: [true, 'Genre is required !']
    },

    audios: {
        type: Array,
        of: String,
        required: [true, 'Audio is required !']
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

export default MusicSchema;
