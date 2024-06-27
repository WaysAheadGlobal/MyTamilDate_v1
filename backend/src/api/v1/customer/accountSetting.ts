import express from 'express';
import { db } from "../../../../db/db";
import { verifyUser } from '../../../middleware/verifyUser';
import { UserRequest } from '../../../types/types';
const { body, validationResult } = require('express-validator');
import multer from 'multer';
import crypto from 'crypto';
import { sendOTPtoPhoneNumber, verifyOTP } from '../../../../otp';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles');
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(16).toString('hex') + file.mimetype.replace('image/', '.'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB 
  }
});

const setting = express.Router();

// name update

setting.get('/namedetails', verifyUser, (req: UserRequest, res: any) => {
    const userId = req.userId;
    const query = `
        SELECT first_name, last_name
        FROM user_profiles
        WHERE user_id = ?
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user profile:', err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      const userProfile = results[0];
      res.status(200).json(userProfile);
    });
  });

  setting.put('/namedetails', [
    verifyUser,
    body('first_name').isString().notEmpty().withMessage('First name is required'),
    
    body('last_name').optional().isString().withMessage('Last name must be a string')
  
  ], (req: UserRequest, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { first_name, last_name, } = req.body;
    const userId = req.userId;
    console.log(userId);
  
    const query = `
        UPDATE user_profiles
        SET first_name = ?, last_name = COALESCE(?, last_name),   updated_at = NOW()
        WHERE user_id = ?
      `;
  
    db.query(query, [first_name, last_name,  userId], (err, results) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });


//   update phone number

setting.post('/updatephone/otp', body('phone').isMobilePhone(),  verifyUser, (req: UserRequest, res: any) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: 'Invalid phone number' });
        return;
    }
    const { phone } = req.body;
    const query = 'SELECT id FROM user_profiles WHERE phone = ?';
    db.query(query, [phone], async (err, results) => {
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

setting.put('/updatephone', [body('phone').isMobilePhone(), body('otp').notEmpty()], verifyUser, async(req: UserRequest, res: any) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
    const userId = req.userId;
    const { phone, otp } = req.body; 

    try {
        const otpResponse = await verifyOTP({ phone, otp });
        if (otpResponse.status !== 'approved') {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        db.beginTransaction((err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                return res.status(500).send('Internal Server Error');
            }

            const updateQuery = 'UPDATE user_profiles SET phone = ? WHERE id = ?';
            db.query(updateQuery, [phone, userId], (err, results) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Error updating phone number:', err);
                        res.status(500).send('Internal Server Error');
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).send('Internal Server Error');
                        });
                    }

                    res.status(200).json({ message: 'Phone number updated successfully!' });
                });
            });
        });
    } catch (error) {
        console.error('Error validating OTP:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//update the Email
setting.put('/updateemail', verifyUser, [
    body('email').isEmail().withMessage('Invalid email address')
  ],verifyUser, (req: UserRequest, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email } = req.body;
    const userId = req.userId;
  
    // Log the values for debugging
    console.log(`Updating email for userId: ${userId}, new email: ${email}`);
  
    // Check if the email already exists
    const checkEmailQuery = 'SELECT id FROM user_profiles WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        return res.status(409).json({ message: 'This email address is already in use. Try with a different email.' });
      }
  
      // Update the email if it doesn't exist
      const updateQuery = 'UPDATE user_profiles SET email = ?, updated_at = NOW() WHERE user_id = ?';
      db.query(updateQuery, [email, userId], (err, results) => {
        if (err) {
          console.error('Error updating email:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User profile not found' });
        }
  
        const selectQuery = 'SELECT * FROM user_profiles WHERE user_id = ?';
        db.query(selectQuery, [userId], (err, updatedResults) => {
          if (err) {
            console.error('Error fetching updated profile data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          res.status(200).json({ message: 'Email updated successfully', data: updatedResults });
        });
      });
    });
  });

  setting.get('/getemail',   verifyUser, (req: UserRequest, res: any) => {
    const userId = req.userId;
  
    // Log the value for debugging
    console.log(`Fetching email for userId: ${userId}`);
  
    const query = 'SELECT email FROM user_profiles WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching email:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.status(200).json({ email: results[0].email });
    });
  });










  export default setting;