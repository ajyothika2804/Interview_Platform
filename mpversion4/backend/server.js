// // const express = require('express');
// // const cors = require('cors');
// // const { Pool } = require('pg');
// // require('dotenv').config();

// // // Initialize Express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // PostgreSQL connection
// // const pool = new Pool({
// //   user: 'postgres', // Replace with your PostgreSQL username
// //   host: 'localhost',
// //   database: 'interview_platform', // Database name
// //   password: 'sriphani111327', // Replace with your PostgreSQL password
// //   port: 5432,
// // });

// // // Routes

// // // 1. Auth Routes
// // const authRouter = express.Router();

// // // Candidate login
// // authRouter.post('/login/candidate', async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
// //     const { rows } = await pool.query(query, [username, password]);

// //     if (rows.length > 0) {
// //       res.json({ success: true, message: 'Login successful', role: 'candidate' });
// //     } else {
// //       res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     console.error('Error in candidate login:', err);
// //     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
// //   }
// // });

// // // Admin login
// // authRouter.post('/login/admin', async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
// //     const { rows } = await pool.query(query, [username, password]);

// //     if (rows.length > 0) {
// //       res.json({ success: true, message: 'Login successful', role: 'admin' });
// //     } else {
// //       res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     console.error('Error in admin login:', err);
// //     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
// //   }
// // });

// // // Mount auth routes
// // app.use('/api/auth', authRouter);

// // // 2. Questions Routes
// // const questionsRouter = express.Router();

// // // Get all questions
// // questionsRouter.get('/', async (req, res) => {
// //   try {
// //     const result = await pool.query('SELECT * FROM questions');
// //     res.status(200).json(result.rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Add new question
// // questionsRouter.post('/', async (req, res) => {
// //   const { question_text, correct_answer } = req.body;

// //   // Validate if question_text and correct_answer are provided
// //   if (!question_text || !correct_answer) {
// //     return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
// //   }

// //   try {
// //     const result = await pool.query(
// //       'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
// //       [question_text, correct_answer]
// //     );
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Mount questions routes
// // app.use('/api/questions', questionsRouter);

// // // 3. Answers Routes
// // const answersRouter = express.Router();

// // // Save candidate answers
// // answersRouter.post('/', async (req, res) => {
// //   const { question_id, candidate_answer } = req.body;
// //   const query = 'INSERT INTO candidate_answers (question_id, candidate_answer) VALUES ($1, $2) RETURNING *';
// //   const values = [question_id, candidate_answer];
// //   try {
// //     const result = await pool.query(query, values);
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Mount answers routes
// // app.use('/api/answers', answersRouter);

// // // 4. Evaluate Routes
// // const evaluateRouter = express.Router();

// // // Evaluate candidate answers
// // evaluateRouter.post('/', async (req, res) => {
// //   const { candidate_answer, correct_answer } = req.body;

// //   try {
// //     // Example of simple similarity scoring (this can be expanded as per your requirement)
// //     const similarityScore = candidate_answer === correct_answer ? 100 : 0;
// //     res.status(200).json({ similarity_score: similarityScore });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Get all questions
// // questionsRouter.get('/', async (req, res) => {
// //     try {
// //       const result = await pool.query('SELECT * FROM questions');
// //       res.status(200).json(result.rows);
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).send('Server error');
// //     }
// //   });
  
// //   // Update a question
// //   questionsRouter.put('/:id', async (req, res) => {
// //     const { id } = req.params;
// //     const { question_text, correct_answer } = req.body;
  
// //     if (!question_text || !correct_answer) {
// //       return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
// //     }
  
// //     try {
// //       const result = await pool.query(
// //         'UPDATE questions SET question_text = $1, correct_answer = $2 WHERE id = $3 RETURNING *',
// //         [question_text, correct_answer, id]
// //       );
// //       res.status(200).json(result.rows[0]);
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).send('Server error');
// //     }
// //   });
  
// //   // Delete a question
// //   questionsRouter.delete('/:id', async (req, res) => {
// //     const { id } = req.params;
  
// //     try {
// //       await pool.query('DELETE FROM questions WHERE id = $1', [id]);
// //       res.status(200).json({ message: 'Question deleted successfully' });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).send('Server error');
// //     }
// //   });
// // // Mount evaluate routes
// // app.use('/api/evaluate', evaluateRouter);

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// // const express = require('express');
// // const cors = require('cors');
// // const { Pool } = require('pg');
// // require('dotenv').config();

// // // Initialize Express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // PostgreSQL connection
// // const pool = new Pool({
// //   user: 'postgres', // Replace with your PostgreSQL username
// //   host: 'localhost',
// //   database: 'interview_platform', // Database name
// //   password: 'sriphani111327', // Replace with your PostgreSQL password
// //   port: 5432,
// // });

// // // Routes

// // // 1. Auth Routes
// // const authRouter = express.Router();

// // // Candidate login
// // authRouter.post('/login/candidate', async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
// //     const { rows } = await pool.query(query, [username, password]);

// //     if (rows.length > 0) {
// //       res.json({ success: true, message: 'Login successful', role: 'candidate' });
// //     } else {
// //       res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     console.error('Error in candidate login:', err);
// //     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
// //   }
// // });

// // // Admin login
// // authRouter.post('/login/admin', async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
// //     const { rows } = await pool.query(query, [username, password]);

// //     if (rows.length > 0) {
// //       res.json({ success: true, message: 'Login successful', role: 'admin' });
// //     } else {
// //       res.status(401).json({ success: false, message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     console.error('Error in admin login:', err);
// //     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
// //   }
// // });

// // // Mount auth routes
// // app.use('/api/auth', authRouter);

// // // 2. Questions Routes
// // const questionsRouter = express.Router();

// // // Get all questions
// // questionsRouter.get('/', async (req, res) => {
// //   try {
// //     const result = await pool.query('SELECT * FROM questions');
// //     res.status(200).json(result.rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });
// // app.use(express.json());

// // // Add new question
// // // Add new question
// // questionsRouter.post('/', async (req, res) => {
// //   const { question_text, correct_answer } = req.body;

// //   // Validate if question_text and correct_answer are provided
// //   if (!question_text || !correct_answer) {
// //     return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
// //   }

// //   try {
// //     const result = await pool.query(
// //       'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
// //       [question_text, correct_answer]
// //     );
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });
// // // app.post("/api/questions", async (req, res) => {
// // //   const { question_text, correct_answer } = req.body;

// // //   if (!question_text || !correct_answer) {
// // //     return res.status(400).json({ message: "All fields are required." });
// // //   }

// // //   try {
// // //     const result = await pool.query(
// // //       "INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *",
// // //       [question_text, correct_answer]
// // //     );
// // //     res.status(201).json({ message: "Question added!", data: result.rows[0] });
// // //   } catch (error) {
// // //     console.error("Error inserting question:", error);
// // //     res.status(500).json({ message: "Database error." });
// // //   }
// // // });


// // // Update a question
// // questionsRouter.put('/:id', async (req, res) => {
// //   const { id } = req.params;
// //   const { question_text, correct_answer } = req.body;

// //   if (!question_text || !correct_answer) {
// //     return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
// //   }

// //   try {
// //     const result = await pool.query(
// //       'UPDATE questions SET question_text = $1, correct_answer = $2 WHERE id = $3 RETURNING *',
// //       [question_text, correct_answer, id]
// //     );
// //     res.status(200).json(result.rows[0]);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Delete a question
// // questionsRouter.delete('/:id', async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     await pool.query('DELETE FROM questions WHERE id = $1', [id]);
// //     res.status(200).json({ message: 'Question deleted successfully' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Mount questions routes
// // app.use('/api/questions', questionsRouter);

// // // 3. Answers Routes
// // const answersRouter = express.Router();

// // // Save candidate answers
// // answersRouter.post('/', async (req, res) => {
// //   const { question_id, candidate_answer } = req.body;
// //   const query = 'INSERT INTO candidate_answers (question_id, candidate_answer) VALUES ($1, $2) RETURNING *';
// //   const values = [question_id, candidate_answer];
// //   try {
// //     const result = await pool.query(query, values);
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Mount answers routes
// // app.use('/api/answers', answersRouter);

// // // 4. Evaluate Routes
// // const evaluateRouter = express.Router();

// // // Evaluate candidate answers
// // evaluateRouter.post('/', async (req, res) => {
// //   const { candidate_answer, correct_answer } = req.body;

// //   try {
// //     // Example of simple similarity scoring (this can be expanded as per your requirement)
// //     const similarityScore = candidate_answer === correct_answer ? 100 : 0;
// //     res.status(200).json({ similarity_score: similarityScore });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Mount evaluate routes
// // app.use('/api/evaluate', evaluateRouter);

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// require('dotenv').config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres', // Replace with your PostgreSQL username
//   host: 'localhost',
//   database: 'interview_platform', // Database name
//   password: 'sriphani111327', // Replace with your PostgreSQL password
//   port: 5432,
// });

// // Routes

// // 1. Auth Routes
// const authRouter = express.Router();

// // Candidate login
// authRouter.post('/login/candidate', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
//     const { rows } = await pool.query(query, [username, password]);

//     if (rows.length > 0) {
//       res.json({ success: true, message: 'Login successful', role: 'candidate' });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Error in candidate login:', err);
//     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
//   }
// });

// // Admin login
// authRouter.post('/login/admin', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
//     const { rows } = await pool.query(query, [username, password]);

//     if (rows.length > 0) {
//       res.json({ success: true, message: 'Login successful', role: 'admin' });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Error in admin login:', err);
//     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
//   }
// });

// // Mount auth routes
// app.use('/api/auth', authRouter);

// // 2. Questions Routes
// const questionsRouter = express.Router();

// // Get all questions
// questionsRouter.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM questions');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Add new question
// questionsRouter.post('/', async (req, res) => {
//   const { question_text, correct_answer } = req.body.question || req.body; // Support both formats

//   console.log("Received Request:", req.body); // Debugging log

//   // Validate if question_text and correct_answer are provided
//   if (!question_text || !correct_answer) {
//     console.log("❌ Missing Fields");
//     return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
//   }

//   try {
//     const result = await pool.query(
//       'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
//       [question_text, correct_answer]
//     );

//     console.log("✅ Inserted into DB:", result.rows[0]); // Debugging log
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("❌ Database Error:", err);
//     res.status(500).json({ message: 'Database error' });
//   }
// });
// // Delete a question by ID
// questionsRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     res.status(200).json({ message: 'Question deleted successfully', deletedQuestion: result.rows[0] });
//   } catch (err) {
//     console.error('❌ Error deleting question:', err);
//     res.status(500).json({ message: 'Database error' });
//   }
// });


// // Mount questions routes
// app.use('/api/questions', questionsRouter);

// // 3. Answers Routes
// const answersRouter = express.Router();

// // Save candidate answers
// answersRouter.post('/', async (req, res) => {
//   const { question_id, candidate_answer } = req.body;
//   const query = 'INSERT INTO questions (question_text,correct_answer) VALUES ($1, $2) RETURNING *';
//   const values = [question_id, candidate_answer];
//   try {
//     const result = await pool.query(query, values);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Mount answers routes
// app.use('/api/answers', answersRouter);

// // 4. Evaluate Routes
// const evaluateRouter = express.Router();

// // Evaluate candidate answers
// evaluateRouter.post('/', async (req, res) => {
//   const { candidate_answer, correct_answer } = req.body;

//   try {
//     // Example of simple similarity scoring (this can be expanded as per your requirement)
//     const similarityScore = candidate_answer === correct_answer ? 100 : 0;
//     res.status(200).json({ similarity_score: similarityScore });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Mount evaluate routes
// app.use('/api/evaluate', evaluateRouter);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// require('dotenv').config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres', // Replace with your PostgreSQL username
//   host: 'localhost',
//   database: 'interview_platform', // Database name
//   password: 'sriphani111327', // Replace with your PostgreSQL password
//   port: 5432,
// });

// // 1️⃣ Authentication Routes
// const authRouter = express.Router();

// // Candidate login (No Changes)
// authRouter.post('/login/candidate', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
//     const { rows } = await pool.query(query, [username, password]);

//     if (rows.length > 0) {
//       res.json({ success: true, message: 'Login successful', role: 'candidate' });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Error in candidate login:', err);
//     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
//   }
// });

// // Admin login (No Changes)
// authRouter.post('/login/admin', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
//     const { rows } = await pool.query(query, [username, password]);

//     if (rows.length > 0) {
//       res.json({ success: true, message: 'Login successful', role: 'admin' });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Error in admin login:', err);
//     res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
//   }
// });

// // Mount auth routes
// app.use('/api/auth', authRouter);

// // 2️⃣ Questions Routes
// const questionsRouter = express.Router();

// // Get all questions
// questionsRouter.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM questions');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching questions:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Add a new question
// questionsRouter.post('/', async (req, res) => {
//   const { question_text, correct_answer } = req.body;

//   if (!question_text || !correct_answer) {
//     return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
//   }

//   try {
//     const result = await pool.query(
//       'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
//       [question_text, correct_answer]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error inserting question:', err);
//     res.status(500).send('Database error');
//   }
// });

// // Delete a question
// questionsRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   // Validate if id is a number
//   if (isNaN(id)) {
//     return res.status(400).json({ message: 'Invalid question ID' });
//   }

//   try {
//     const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Question not found' });
//     }

//     res.status(200).json({ message: 'Question deleted successfully', deletedQuestion: result.rows[0] });
//   } catch (err) {
//     console.error('Error deleting question:', err);
//     res.status(500).json({ message: 'Database error' });
//   }
// });

// // Mount questions routes
// app.use('/api/questions', questionsRouter);

// // 3️⃣ Answers Routes
// const answersRouter = express.Router();

// // Save candidate answers (FIXED incorrect table reference)
// answersRouter.post('/', async (req, res) => {
//   const { question_id, candidate_answer } = req.body;

//   if (!question_id || !candidate_answer) {
//     return res.status(400).json({ message: 'Both question_id and candidate_answer are required' });
//   }

//   try {
//     const query = 'INSERT INTO candidate_answers (question_id, candidate_answer) VALUES ($1, $2) RETURNING *';
//     const result = await pool.query(query, [question_id, candidate_answer]);

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error saving answer:', err);
//     res.status(500).send('Database error');
//   }
// });


// app.post('/evaluate', async (req, res) => {
//   try {
//       console.log("Received evaluation request:", req.body);

//       const { answers, correctAnswers } = req.body;
//       console.log("User answers:", answers);
//       console.log("Correct answers:", correctAnswers);

//       if (!answers || !correctAnswers) {
//           throw new Error("Missing answer data.");
//       }

//       const similarityScores = answers.map((ans, index) => {
//           if (!ans) {
//               console.log(`Question ${index + 1} has no answer.`);
//               return "Error";
//           }
//           // Simulate similarity calculation
//           return Math.random().toFixed(2); // Replace with actual NLP comparison
//       });

//       console.log("Similarity Scores:", similarityScores);

//       const validScores = similarityScores.filter(score => score !== "Error").map(Number);
//       const averageScore = validScores.length ? 
//           (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2) 
//           : "NaN";

//       res.json({ similarityScores, averageScore });

//   } catch (error) {
//       console.error("Evaluation error:", error);
//       res.status(500).json({ error: "Evaluation failed." });
//   }
// });


// // Mount answers routes
// app.use('/api/answers', answersRouter);

// // 4️⃣ Evaluate Routes
// const evaluateRouter = express.Router();

// // Evaluate candidate answers
// evaluateRouter.post('/', async (req, res) => {
//   const { candidate_answer, correct_answer } = req.body;

//   if (!candidate_answer || !correct_answer) {
//     return res.status(400).json({ message: 'Both candidate_answer and correct_answer are required' });
//   }

//   try {
//     // Example: Simple similarity scoring (modify as needed)
//     const similarityScore = candidate_answer === correct_answer ? 100 : 0;
//     res.status(200).json({ similarity_score: similarityScore });
//   } catch (err) {
//     console.error('Error evaluating answer:', err);
//     res.status(500).send('Database error');
//   }
// });

// // Mount evaluate routes
// app.use('/api/evaluate', evaluateRouter);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'interview_platform', // Database name
  password: 'sriphani111327', // Replace with your PostgreSQL password
  port: 5432,
});

console.log("✅ Connected to PostgreSQL Database");

// Import routers
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const evaluateRouter = require('./routes/evaluate');

// Register API routes
app.use('/api/questions', questionsRouter);
app.use('/api/answers', answersRouter);
app.use('/api/evaluate', evaluateRouter);

// Authentication Routes
const authRouter = express.Router();

// Candidate login
authRouter.post('/login/candidate', async (req, res) => {
  console.log("🔑 Candidate login request received:", req.body);
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const { rows } = await pool.query(query, [username, password]);
    
    if (rows.length > 0) {
      console.log("✅ Candidate login successful for:", username);
      res.json({ success: true, message: 'Login successful', role: 'candidate' });
    } else {
      console.warn("⚠️ Invalid candidate credentials for:", username);
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error("❌ Error in candidate login:", err);
    res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
  }
});

// Admin login
authRouter.post('/login/admin', async (req, res) => {
  console.log("🔑 Admin login request received:", req.body);
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
    const { rows } = await pool.query(query, [username, password]);
    
    if (rows.length > 0) {
      console.log("✅ Admin login successful for:", username);
      res.json({ success: true, message: 'Login successful', role: 'admin' });
    } else {
      console.warn("⚠️ Invalid admin credentials for:", username);
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error("❌ Error in admin login:", err);
    res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
  }
});

app.use('/api/auth', authRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));