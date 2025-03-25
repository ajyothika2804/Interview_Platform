const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// **🔹 Admin Login (Updated with Logs)**
router.post('/login/admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("🔹 Login Attempt:", username);

        // Check if admin exists
        const adminResult = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
        if (adminResult.rows.length === 0) {
            console.log("❌ No admin found in DB");
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const admin = adminResult.rows[0];
        console.log("🔹 User Found in DB:", admin);

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("🔹 Entered Password:", password);
        console.log("🔹 Hashed Password from DB:", admin.password);
        
        if (!isMatch) {
            console.log("❌ Password does not match");
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        console.log("✅ Login Successful, Generating JWT...");

        res.json({ success: true, token, role: 'admin' });

    } catch (err) {
        console.error("❌ Server Error:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router; 