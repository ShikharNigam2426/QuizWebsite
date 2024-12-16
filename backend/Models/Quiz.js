import mongoose from 'mongoose';

// Define the Question schema
const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  options: [
    { type: String, required: true },
    { type: String, required: true },
    { type: String, required: true },
    { type: String, required: true }
  ],
  correctAnswer: { type: String, required: true }
});

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
  code: { type: Number, required: true, unique: true }, // Assuming code is a number, not a string
  questions: [questionSchema]  // Array of questions
});

// Create and export the Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
