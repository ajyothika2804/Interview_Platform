// const express = require('express');
// const pool = require('../db');
// const router = express.Router();

// // Save candidate answers
// router.post('/answers', async (req, res) => {
//   const { question_id, candidate_answer } = req.body;
//   const query = 'INSERT INTO candidate_answers (question_id, candidate_answer) VALUES ($1, $2) RETURNING *';
//   const values = [question_id, candidate_answer];
//   try {
//     const result = await pool.query(query, values);
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

// Save candidate answers
router.post('/', async (req, res) => {
  const { question_id, candidate_answer } = req.body;
  const query = 'INSERT INTO candidate_answers (question_id, candidate_answer) VALUES ($1, $2) RETURNING *';
  const values = [question_id, candidate_answer];
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
