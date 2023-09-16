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
    type: String, 
    required: [true, 'Author is required !']
  },

  created: {
    type: Date,
    default: Date.now
  }
});

MusicSchema.index({author: 'text', audios: 'text'});

export default MusicSchema;
