import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import Quiz from './Models/Quiz.js';
import Result from './Models/Results.js';  // Import Results model

dotenv.config();

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// MongoDB connection
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

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
});

const User = mongoose.model('User', userSchema);

// Register User Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route (sending OTP)
app.post('/login', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Redirecting to signup' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in the database
    user.otp = otp;
    await user.save();

    // Send OTP via email
    sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Verify OTP Route
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches
    if (user.otp === otp) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Error verifying OTP' });
  }
});

// Send OTP Email
const sendOTPEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Quiz Routes

// Create Quiz with Questions
app.post('/createquiz', async (req, res) => {
  const { code, questions } = req.body;
  try {
    const quiz = new Quiz({
      code: code,
      questions: questions,
    });
    await quiz.save();
    res.status(201).json({
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    console.error('Error creating quiz:', error.message);
    res.status(500).json({
      message: 'Error creating quiz',
      error: error.message,
    });
  }
});

// Verify Quiz Code
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

// Fetch Questions of a Quiz
app.get('/api/quizzes/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const quiz = await Quiz.findOne({ code: code });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Store Quiz Result and Update Leaderboard
app.post('/api/submit-quiz-result', async (req, res) => {
  const { email, score, quizCode } = req.body;
  try {
    const result = new Result({
      email,
      score,
      quizCode,
    });
    await result.save();
    res.status(201).json({ message: 'Result saved successfully' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Error saving result' });
  }
});

// Fetch Leaderboard for a Quiz
app.get('/api/leaderboard/:quizCode', async (req, res) => {
  const { quizCode } = req.params;
  try {
    const results = await Result.find({ quizCode })
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(10);  // Get top 10 scores

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found for this quiz' });
    }

    res.status(200).json({ leaderboard: results });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
