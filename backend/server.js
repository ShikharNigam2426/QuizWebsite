import express from 'express';
import mongoose from 'mongoose';
import Quiz from './Models/Quiz.js';
import { log } from 'console';
import cors from 'cors';


const app = express();
const port = 3003;
app.use(cors());

// MongoDB connection using await
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/quizDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());

// Create Quiz with Questions
app.post('/createquiz', async (req, res) => {
  console.log(req.body);
  try {
    const { code, questions } = req.body;
    console.log('Received data:', { code, questions }); 
    const quizCode = code;

    // Create a new Quiz document
    const quiz = new Quiz({
      code: quizCode,
      questions: questions, // Directly adding questions array
    });

    // Save the quiz
    await quiz.save();
    console.log('Quiz saved:', quiz);  // Logging after saving

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    console.error('Error creating quiz:', error.message);  // Logging error message
    res.status(500).json({
      message: 'Error creating quiz',
      error: error.message,
    });
  }
});

// I am verifying the quiz code here, which is being called when clicking on the join button from the landing page.
app.get('/quiz/:code', async (req, res) => {
  const quizCode = req.params.code;
  try {
    const quiz = await Quiz.findOne({ code: quizCode });

    if (quiz) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking quiz code:', error);
    res.status(500).json({ message: 'Error checking quiz code' });
  }
});

// yaha pe questions fetch kr rha hu quiz wale page pe
app.get('/api/quizzes/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const quiz = await Quiz.findOne({ code: code });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/createquiz`);
});
