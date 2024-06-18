import express from 'express';
import { verifyUser } from '../../../middleware/verifyUser';
const { body, validationResult } = require('express-validator');
import { db } from "../../../../db/db";
import { UserRequest } from '../../../types/types';
import { error } from 'console';

const profile = express.Router();

// Get all user profiles
profile.get('/', verifyUser, (req, res) => {
  const query = 'SELECT * FROM user_profiles';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    return res.status(200).json({ message: 'User profiles retrieved successfully!', data: results });
  });
});

//Update Email add to user Profile
profile.post('/updateemail', verifyUser, [
  body('email').isEmail().withMessage('Invalid email address')
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  const userId = req.userId;

  // Log the values for debugging
  console.log(`Updating email for userId: ${userId}, new email: ${email}`);

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


//update name,last name, brithday, gender , genderwan
profile.post('/update-profile', [
  verifyUser,
  body('first_name').isString().notEmpty().withMessage('First name is required'),
  body('birthday').isDate().withMessage('Birthday must be a valid date'),
  body('gender').isInt().withMessage('Gender must be an integer'),
  body('want_gender').isInt().withMessage('Wanted gender must be an integer'),
  body('last_name').optional().isString().withMessage('Last name must be a string')
], (req: UserRequest, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, birthday, gender, want_gender } = req.body;
  const userId = req.userId;
  console.log(userId);

  const query = `
      UPDATE user_profiles
      SET first_name = ?, last_name = COALESCE(?, last_name), birthday = ?, gender = ?, want_gender = ?, updated_at = NOW()
      WHERE user_id = ?
    `;

  db.query(query, [first_name, last_name, birthday, gender, want_gender, userId], (err, results) => {
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


//add locations and update user_profile with locations_id

profile.post('/locations', [
  verifyUser,
  body('country').isString().notEmpty().withMessage('Country is required'),
  body('location_string').isString().notEmpty().withMessage('Location string is required'),
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { country, location_string } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}, Country: ${country}, Location String: ${location_string}`);

  const query = 'INSERT INTO locations (country, location_string, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';

  db.query(query, [country, location_string], (err, results) => {
    if (err) {
      console.error('Error inserting location:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const locationId = results.insertId;
    const updateUserProfileQuery = 'UPDATE user_profiles SET location_id = ?, updated_at = NOW() WHERE user_id = ?';

    db.query(updateUserProfileQuery, [locationId, userId], (err, updateResults) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json({ message: 'Location added and user profile updated successfully' });
    });
  });
});

//add religions and update user_profile with locations_id
profile.post('/religions', [
  verifyUser,
  body('name').isString().notEmpty().withMessage('Religion name is required'),
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}, Religion: ${name}`);

  const query = 'INSERT INTO religions (name, visible, created_at, updated_at) VALUES (?, 1, NOW(), NOW())';

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting religion:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const religionId = results.insertId;
    const updateUserProfileQuery = 'UPDATE user_profiles SET religion_id = ?, updated_at = NOW() WHERE user_id = ?';

    db.query(updateUserProfileQuery, [religionId, userId], (err, updateResults) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json({ message: 'Religion added and user profile updated successfully' });
    });
  });
});

//add languages and update user_profile with language_id
profile.post('/languages', [
  verifyUser,
  body('name').isString().notEmpty().withMessage('Language name is required'),
  body('code').isString().notEmpty().withMessage('Language code is required'),
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, code } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}, Language Name: ${name}, Language Code: ${code}`);

  const query = 'INSERT INTO languages (name, code, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';

  db.query(query, [name, code], (err, results) => {
    if (err) {
      console.error('Error inserting language:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const languageId = results.insertId;
    const updateUserProfileQuery = 'UPDATE user_profiles SET language_id = ?, updated_at = NOW() WHERE user_id = ?';

    db.query(updateUserProfileQuery, [languageId, userId], (err, updateResults) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json({ message: 'Language added and user profile updated successfully' });
    });
  });
});

//add growths and update user_profile with growths_id
profile.post('/growths', [
  verifyUser,
  body('name').isString().notEmpty().withMessage('Growth name is required'),
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}, Growth Name: ${name}`);

  const query = 'INSERT INTO growths (name, visible, created_at, updated_at) VALUES (?, 1, NOW(), NOW())';

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting growth:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const growthId = results.insertId;
    const updateUserProfileQuery = 'UPDATE user_profiles SET growth_id = ?, updated_at = NOW() WHERE user_id = ?';

    db.query(updateUserProfileQuery, [growthId, userId], (err, updateResults) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json({ message: 'Growth added and user profile updated successfully' });
    });
  });
});


//add studies and update user_profile with studies_id
profile.post('/studies', [
  verifyUser,
  body('name').isString().notEmpty().withMessage('Study name is required'),
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}, Study Name: ${name}`);

  const query = 'INSERT INTO studies (name, visible, created_at, updated_at) VALUES (?, 1, NOW(), NOW())';

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting study:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const studyId = results.insertId;
    const updateUserProfileQuery = 'UPDATE user_profiles SET study_id = ?, updated_at = NOW() WHERE user_id = ?';

    db.query(updateUserProfileQuery, [studyId, userId], (err, updateResults) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json({ message: 'Study added and user profile updated successfully' });
    });
  });
});

//add jobs and update user_profile with jobs_id
profile.post('/jobs', [
  verifyUser,
  body('name').isString().notEmpty().withMessage('Job name is required'),
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}, Job Name: ${name}`);

  const query = 'INSERT INTO jobs (name, visible, created_at, updated_at) VALUES (?, 1, NOW(), NOW())';

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting job:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const jobId = results.insertId;
    const updateUserProfileQuery = 'UPDATE user_profiles SET job_id = ?, updated_at = NOW() WHERE user_id = ?';

    db.query(updateUserProfileQuery, [jobId, userId], (err, updateResults) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json({ message: 'Job added and user profile updated successfully' });
    });
  });
});




//add want_kids and update user_profile with jobs_id.. family plans
profile.post('/update-want-kids', verifyUser, [
  body('want_kid_id').isInt().withMessage('Want Kid ID must be an integer')
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { want_kid_id } = req.body;
  const userId = req.userId;

  // Log the values for debugging
  console.log(`Updating want_kid_id for userId: ${userId}, new want_kid_id: ${want_kid_id}`);

  const updateQuery = 'UPDATE user_profiles SET want_kid_id = ?, updated_at = NOW() WHERE user_id = ?';
  db.query(updateQuery, [want_kid_id, userId], (err, results) => {
    if (err) {
      console.error('Error updating want_kid_id:', err);
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

      res.status(200).json({ message: 'Want Kid ID updated successfully', data: updatedResults });
    });
  });
});

// Update have_kid_id in user profile
profile.post('/update-have-kids', verifyUser, [
  body('have_kid_id').isInt().withMessage('Have Kid ID must be an integer')
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { have_kid_id } = req.body;
  const userId = req.userId;

  // Log the values for debugging
  console.log(`Updating have_kid_id for userId: ${userId}, new have_kid_id: ${have_kid_id}`);

  const updateQuery = 'UPDATE user_profiles SET have_kid_id = ?, updated_at = NOW() WHERE user_id = ?';
  db.query(updateQuery, [have_kid_id, userId], (err, results) => {
    if (err) {
      console.error('Error updating have_kid_id:', err);
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

      res.status(200).json({ message: 'Have Kid ID updated successfully', data: updatedResults });
    });
  });
});

//update do smoke or not
profile.post('/update-smoke', verifyUser, [
  body('smoke_id').isInt().withMessage('Smoke ID must be an integer')
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { smoke_id } = req.body;
  const userId = req.userId;

  // Log the values for debugging
  console.log(`Updating smoke_id for userId: ${userId}, new smoke_id: ${smoke_id}`);

  const updateQuery = 'UPDATE user_profiles SET smoke_id = ?, updated_at = NOW() WHERE user_id = ?';
  db.query(updateQuery, [smoke_id, userId], (err, results) => {
    if (err) {
      console.error('Error updating smoke_id:', err);
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

      res.status(200).json({ message: 'Smoke ID updated successfully', data: updatedResults });
    });
  });
});

// Update drink_id in user profile
profile.post('/update-drink', verifyUser, [
  body('drink_id').isInt().withMessage('Drink ID must be an integer')
], (req: UserRequest, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { drink_id } = req.body;
  const userId = req.userId;

  // Log the values for debugging
  console.log(`Updating drink_id for userId: ${userId}, new drink_id: ${drink_id}`);

  const updateQuery = 'UPDATE user_profiles SET drink_id = ?, updated_at = NOW() WHERE user_id = ?';
  db.query(updateQuery, [drink_id, userId], (err, results) => {
    if (err) {
      console.error('Error updating drink_id:', err);
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

      res.status(200).json({ message: 'Drink ID updated successfully', data: updatedResults });
    });
  });
});















export default profile;
