import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required !']
    },

    genre: {
        type: String,
        required: [true, 'Genre is required !']
    },

    description: {
        type: String,
        required: [true, 'Description is required !']
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

MovieSchema.index({title: 'text'});

export default MovieSchema;
