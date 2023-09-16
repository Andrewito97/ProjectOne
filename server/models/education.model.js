import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Title is required !']
  },
  text: {
    type: String,
    required: [true, 'Text is required !'],
    minlength: [4, 'Text is too short !']
  }
});

export default EducationSchema;
