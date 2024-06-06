import { Router } from 'express';
import { db } from '../../../../db/db';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';

dotenv.config();
const adminAuth = Router();
adminAuth.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT id, username, password FROM admin_users WHERE username = ?`;
    const values = [username];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
            if (bcryptErr) {
                console.log('Error comparing passwords:', bcryptErr);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                res.status(500).send('JWT Secret is not defined');
                return;
            }

            const jwt = sign({ username: user.username, adminId: user.id }, jwtSecret, { expiresIn: '30 days' });

            res.status(200).json({ message: 'Login successful!', token: jwt });
        });
    });
});

export default adminAuth;
