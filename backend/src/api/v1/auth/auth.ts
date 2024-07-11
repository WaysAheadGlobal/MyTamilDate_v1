import { Router } from "express";
import { sign } from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { db } from "../../../../db/db";
import { sendOTPtoPhoneNumber, verifyOTP, testTwilioConnection } from '../../../../otp';
import { UserRequest } from "../../../types/types";
import crypto from 'crypto';
import { verifyUser } from "../../../middleware/verifyUser";
import sgMail from '@sendgrid/mail';
import ejs from 'ejs';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getOTPFromDBByEmail, insertOTPInDBByEmail } from "../../../../otpbyEmail";

const auth = Router();
let otpData: { phone: string, otp: string, createdAt: Date } | null = null;

// Route to send OTP for login
auth.get('/test-twilio', async (req, res) => {
    const isConnected = await testTwilioConnection();
    if (isConnected) {
        res.status(200).send('Twilio connection successful');
    } else {
        res.status(500).send('Twilio connection failed');
    }
});
// Route to send OTP for login
auth.post('/login/otp',
    [
        body('phone').notEmpty().withMessage('Phone number is required'),

    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { phone, countryCode } = req.body;

        const query = 'SELECT first_name FROM user_profiles WHERE phone = ?';
        db.query<RowDataPacket[]>(query, phone, async (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid phone' });
            }

            try {

                await sendOTPtoPhoneNumber({ phone: phone });
                return res.status(200).json({ message: 'OTP sent successfully!' });
                // return res.status(200).json({ message: 'Your OTP is ',otp });
            } catch (error) {
                console.error('Error sending OTP:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
);

// Route to verify OTP and login
auth.post('/login',
    [
        body('phone').notEmpty().withMessage('Phone number is required'),
        body('otp').notEmpty().withMessage('OTP is required')
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { phone, otp } = req.body;

        try {
            const otpResponse = await verifyOTP({ phone: phone, otp });
            if (otpResponse.status !== 'approved') {
                return res.status(401).json({ message: otpResponse.message });
            }

            const query = 'SELECT id, user_id, first_name FROM user_profiles WHERE phone = ?';
            db.query<RowDataPacket[]>(query, [phone], (err, results) => {
                if (err) {
                    console.error('Error fetching data:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                if (results.length === 0) {
                    return res.status(401).json({ message: 'Invalid phone' });
                }

                const jwt = sign({ phone: phone, userId: results[0].user_id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });
                return res.status(200).json({ message: 'Login successful!', token: jwt, Result: results });
            });
        } catch (error) {
            console.error('Error validating OTP:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
);

auth.post("/login/email-otp", async (req, res) => {
    const { email } = req.body;

    db.query<RowDataPacket[]>('SELECT id FROM user_profiles WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Please signup first' });
        }

        try {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            console.log(`Generated OTP for ${email}: ${otp}`);

            await insertOTPInDBByEmail(otp, email);


            let html;
            try {
                html = await ejs.renderFile("mail/templates/otp.ejs", { otp: otp });
            } catch (renderError) {
                console.error('Error rendering email template:', renderError);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const msg = {
                to: email,
                from: "mtdteam2024@gmail.com",
                subject: "MTD Login Code",
                html: html
            };

            sgMail.send(msg)
                .then(() => {
                    console.log("Approval email sent successfully");
                    return res.status(200).send('Status updated successfully and email sent');
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    return res.status(500).send('Internal Server Error');
                });

        } catch (error) {
            console.error('Error sending OTP:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});

auth.post("/login/email", async (req, res) => {
    const { email, otp } = req.body;
    const usingGoogle = req.body.usingGoogle;

    if (usingGoogle) {
        const query = 'SELECT id, user_id, first_name FROM user_profiles WHERE email = ?';
        db.query<RowDataPacket[]>(query, [email], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email' });
            }

            const jwt = sign({ email: email, userId: results[0].user_id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });

            return res.status(200).json({ message: 'Login successful!', token: jwt, Result: results });
        });
        return;
    }

    try {
        const verify = await getOTPFromDBByEmail(otp, email);

        if (!verify) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const query = 'SELECT id, user_id, first_name FROM user_profiles WHERE email = ?';

        db.query<RowDataPacket[]>(query, [email], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email' });
            }

            const jwt = sign({ email: email, userId: results[0].user_id }, process.env.JWT_SECRET as string, { expiresIn: '30 days' });

            return res.status(200).json({ message: 'Login successful!', token: jwt, Result: results });
        });

    } catch (error) {
        console.error('Error validating OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to send OTP for signup
auth.post('/signup/otp', body('phone').isMobilePhone(['en-IN', 'en-CA', 'en-US', 'en-AU']), async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: 'Invalid phone number' });
        return;
    }

    const { phone } = req.body;

    const query = 'SELECT id FROM user_profiles WHERE phone = ?';
    db.query<RowDataPacket[]>(query, [phone], async (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.status(409).json({ message: 'This phone number is already in use. Try with a different number.' });
            return;
        }

        try {
            await sendOTPtoPhoneNumber({ phone });
            res.status(200).json({ message: 'OTP sent successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
            console.error('Error sending OTP:', error);
        }
    });
});

// Route to verify OTP and signup
auth.post('/signup', [body('phone').isMobilePhone(['en-IN', 'en-CA', 'en-US', 'en-AU'])], async (req: UserRequest, res: any) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ message: 'Invalid phone number' });
    }

    const { phone, otp } = req.body;

    try {
        const otpResponse = await verifyOTP({ phone, otp });
        if (otpResponse.status !== 'approved') {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        const query = 'SELECT id FROM user_profiles WHERE phone = ?';
        db.query<RowDataPacket[]>(query, [phone], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).send('Please Try Again');
            }

            if (results.length > 0) {
                return res.status(409).json({ message: 'User already exists' });
            }

            db.beginTransaction((err) => {
                if (err) {
                    console.error('Error starting transaction:', err);
                    return res.status(500).send('Internal Server Error');
                }

                const userQuery = `INSERT INTO users (approval, active, created_at, updated_at, incomplete_email, trial_popup_shown, is_online, last_activity, unseen_message_sent)
                VALUES (40, 1, NOW(), NOW(), 0, 0, 0, NOW(), 0)`;

                db.query<ResultSetHeader>(userQuery, (userErr, userResult) => {
                    if (userErr) {
                        return db.rollback(() => {
                            console.error('Error inserting user:', userErr);
                            res.status(500).send('Internal Server Error');
                        });
                    }

                    const userId = userResult.insertId;
                    console.log(userId);

                    const profileQuery = `INSERT INTO user_profiles (user_id, completed, phone, created_at, updated_at)
                          VALUES (?, 0, ?, NOW(), NOW())`;

                    db.query(profileQuery, [userId, phone], (profileErr, profileResult) => {
                        if (profileErr) {
                            return db.rollback(() => {
                                console.error('Error inserting user profile:', profileErr);
                                res.status(500).send('Internal Server Error');
                            });
                        }
                        db.commit((commitErr) => {
                            if (commitErr) {
                                return db.rollback(() => {
                                    console.error('Error committing transaction:', commitErr);
                                    res.status(500).send('Internal Server Error');
                                });
                            }
                            const jwt = sign({ phone, userId }, process.env.JWT_SECRET as string, { expiresIn: '15 days' });
                            res.status(201).json({ message: 'Sign up successful', token: jwt, userId });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error validating OTP:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


auth.post("/verify", verifyUser, async (req: UserRequest, res) => {

    db.query<RowDataPacket[]>('SELECT email FROM user_profiles WHERE user_id = ?', [req.userId], async (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const msg: sgMail.MailDataRequired = {
            to: results[0].email,
            from: "mtdteam2024@gmail.com",
            subject: "Email Verification",
            html: await ejs.renderFile("mail/templates/verify.ejs", { link: `${process.env.URL}/api/v1//user/verify/${token}` }),
        };

        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Internal Server Error');
        }

        db.query('INSERT INTO verification_token (user_id, token, created_at) VALUES (?, ?, NOW())', [req.userId, token], (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.status(200).json({ message: 'Verification email sent' });
        });
    });
});

auth.get("/verify/:token", async (req: UserRequest, res) => {
    const { token } = req.params;

    db.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.redirect(`${process.env.URL}/approve`);
        }

        db.query<RowDataPacket[]>('SELECT user_id FROM verification_token WHERE token = ?', [token], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                db.rollback(err => {
                    if (err) {
                        console.error('Error rolling back transaction:', err);
                    }
                    return res.redirect(`${process.env.URL}/approve`);
                });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            db.query('UPDATE users SET approval = 10 WHERE id = ?', [results[0].user_id], (err) => {
                if (err) {
                    console.error('Error updating data:', err);
                    db.rollback(err => {
                        if (err) {
                            console.error('Error rolling back transaction:', err);
                        }
                        return res.redirect(`${process.env.URL}/approve`);
                    });
                }

                db.query('UPDATE user_profiles SET email_verified_at = NOW() WHERE user_id = ?', [results[0].user_id], (err) => {
                    if (err) {
                        console.error('Error updating data:', err);
                        db.rollback(err => {
                            if (err) {
                                console.error('Error rolling back transaction:', err);
                            }
                            return res.redirect(`${process.env.URL}/approve`);
                        });
                    }

                    db.commit(err => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return res.status(500).send('Internal Server Error');
                        }

                        res.redirect(`${process.env.URL}/pending`);
                    });
                });
            });
        });
    })
});

export default auth;
