const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the PostgreSQL pool

// Candidate login
router.post('/login/candidate', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const { rows } = await db.query(query, [username, password]);

        if (rows.length > 0) {
            res.json({ success: true, message: 'Login successful', role: 'candidate' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error in candidate login:', err); // Log the error
        res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
    }
});

// Admin login
router.post('/login/admin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT * FROM admins WHERE username = $1 AND password = $2';
        const { rows } = await db.query(query, [username, password]);

        if (rows.length > 0) {
            res.json({ success: true, message: 'Login successful', role: 'admin' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error in admin login:', err); // Log the error
        res.status(500).json({ success: false, message: 'An error occurred', error: err.message });
    }
});

module.exports = router;