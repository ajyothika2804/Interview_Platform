// // const express = require('express');
// // const pool = require('../db');
// // const router = express.Router();

// // // Add questions and answers
// // router.post('/questions', async (req, res) => {
// //   const { question, answer } = req.body;
// //   const query = 'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *';
// //   const values = [question, answer];
// //   try {
// //     const result = await pool.query(query, values);
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // // Get all questions
// // router.get('/questions', async (req, res) => {
// //   try {
// //     const result = await pool.query('SELECT * FROM questions');
// //     res.status(200).json(result.rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // });

// // module.exports = router;
// // const express = require('express');
// // const db = require('../db'); 
// // const router = express.Router();

// // router.post('/add-question', async (req, res) => {
// //   try {
// //     const { question_text, correct_answer } = req.body;

// //     if (!question_text || !correct_answer) {
// //       return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
// //     }

// //     const result = await db.query(
// //       'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
// //       [question_text, correct_answer]
// //     );

// //     res.status(201).json({ message: 'Question added successfully', question: result.rows[0] });
// //   } catch (error) {
// //     console.error('Error adding question:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });
// // module.exports = router;
// const express = require('express');
// const pool = require('../db');
// const router = express.Router();

// // Get all questions
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM questions');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });
// router.post('/', async (req, res) => {
//   const { question_text, correct_answer } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
//       [question_text, correct_answer]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

// const express = require('express');
// const pool = require('../db');
// const router = express.Router();

// // Get all questions
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM questions');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Add new question
// router.post('/', async (req, res) => {
//   const { question_text, correct_answer } = req.body;

//   // Validate if question_text and correct_answer are provided
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
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;



const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM questions');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add new question
router.post('/', async (req, res) => {
  const { question_text, correct_answer } = req.body;

  if (!question_text || !correct_answer) {
    return res.status(400).json({ message: 'Both question_text and correct_answer are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO questions (question_text, correct_answer) VALUES ($1, $2) RETURNING *',
      [question_text, correct_answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE a question by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🛠️ Attempting to delete question with ID: ${id}`);

    const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      console.warn(`⚠️ No question found with ID: ${id}`);
      return res.status(404).json({ message: 'Question not found' });
    }

    console.log(`✅ Deleted question:`, result.rows[0]);
    res.json({ message: 'Question deleted successfully', deletedQuestion: result.rows[0] });
  } catch (err) {
    console.error('❌ Error deleting question:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
