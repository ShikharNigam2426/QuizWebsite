import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, required: true },
  quizCode: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
