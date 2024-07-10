import express from 'express';
import { db } from "../../../../db/db";
import { verifyUser } from '../../../middleware/verifyUser';
import { UserRequest } from '../../../types/types';
const { body, validationResult } = require('express-validator');
import multer from 'multer';
import crypto from 'crypto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

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

const updateprofile = express.Router();


updateprofile.post("/mediaupdate",
  verifyUser,
  upload.fields([
    { name: 'main', maxCount: 1 },
    { name: 'first', maxCount: 1 },
    { name: 'second', maxCount: 1 },
  ]),
  async (req: UserRequest, res: express.Response) => {
    const userId = req.userId;
    const mediaId = req.body.media_id;
    const type = req.body.type

    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }

    const fileKeys = Object.keys(req.files);
    if (fileKeys.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const fileKey = fileKeys[0];
    const file = (req.files as any)[fileKey][0];

    // Assign type based on the field name
    // let type;
    // switch (fileKey) {
    //   case 'main':
    //     type = 31;
    //     break;
    //   case 'first':
    //   case 'second':
    //     type = 32;
    //     break;
    //   default:
    //     return res.status(400).send('Invalid file type.');
    // }

    const query = 'INSERT INTO media_update (user_id,media_id, hash, extension, type, meta, created_at, updated_at) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
    const values = [
      userId,
      mediaId,
      file.filename.split(".")[0],
      file.mimetype.split("/")[1],
      type,
      JSON.stringify(file),
      new Date(),
      new Date(),
    
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting media:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(200).json({ message: 'Media uploaded successfully' });
    });
  }
);




updateprofile.post("/media",
    verifyUser,
    upload.fields([
      { name: 'main', maxCount: 1 },
      { name: 'first', maxCount: 1 },
      { name: 'second', maxCount: 1 },
    ]),
    async (req: UserRequest, res: express.Response) => {
      const userId = req.userId;
      console.log(req.files);
  
      if (!req.files) {
        return res.status(400).send('No files were uploaded.');
      }
  
      const main = (req.files as any)['main'] ? (req.files as any)['main'][0] : null;
      const first = (req.files as any)['first'] ? (req.files as any)['first'][0] : null;
      const second = (req.files as any)['second'] ? (req.files as any)['second'][0] : null;
  
      // type 3 is for new media and then 1 is for avatar and 2 is for profile
  
      const query = 'INSERT INTO media (user_id, hash, extension, type, meta, created_at, updated_at) VALUES ?';
      const values = [
        [userId, main.filename.split(".")[0], main.mimetype.split("/")[1], 31, JSON.stringify(main), new Date(), new Date()],
        [userId, first.filename.split(".")[0], first.mimetype.split("/")[1], 32, JSON.stringify(first), new Date(), new Date()],
        [userId, second.filename.split(".")[0], second.mimetype.split("/")[1], 32, JSON.stringify(second), new Date(), new Date()]
      ];
  
      db.query(query, [values], (err, results) => {
        if (err) {
          console.error('Error inserting media:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        res.status(200).json({ message: 'Media uploaded successfully' });
      });
    }
  )
  
  updateprofile.get('/media', verifyUser, (req: UserRequest, res: express.Response) => {
    const userId = req.userId;
    console.log(userId);
  
    const query = 'SELECT id, hash, extension, type FROM media WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching media:', err);
        return res.status(500).send('Internal Server Error');
      }
  
      res.status(200).json(results);
    });
  });

  updateprofile.delete("/media/:id",
    verifyUser,
    (req: UserRequest, res: express.Response) => {
      const userId = req.userId;
      const mediaId = req.params.id;
  
      const query = 'DELETE FROM media WHERE id = ? AND user_id = ?';
      db.query(query, [mediaId, userId], (err, results: ResultSetHeader) => {
        if (err) {
          console.error('Error deleting media:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).send('Media not found or not authorized to delete this media.');
        }
  
        res.status(200).json({ message: 'Media deleted successfully' });
      });
    }
  );
  
  updateprofile.put("/media/:id",
    verifyUser,
    upload.single('file'),
    async (req: UserRequest, res: express.Response) => {
      const userId = req.userId;
      const mediaId = req.params.id;
      const file = req.file;
  
      if (!file) {
        return res.status(400).send('No file was uploaded.');
      }
  
      const query = 'UPDATE media SET hash = ?, extension = ?, meta = ?, updated_at = ? WHERE id = ? AND user_id = ?';
      const values = [
        file.filename.split(".")[0],
        file.mimetype.split("/")[1],
        JSON.stringify(file),
        new Date(),
        mediaId,
        userId
      ];
  
      db.query(query, values, (err, results: ResultSetHeader) => {
        if (err) {
          console.error('Error updating media:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).send('Media not found or not authorized to update this media.');
        }
  
        res.status(200).json({ message: 'Media updated successfully' });
      });
    }
  );

  updateprofile.get('/questionanswer', (req: UserRequest, res: express.Response) => {
    const userId = req.userId;

    const sql = `
        SELECT 
            qa.question_id,
            q.text AS question,
            qa.answer,
            qa.created_at,
            qa.updated_at
        FROM 
            question_answers qa
        JOIN 
            questions q ON qa.question_id = q.id
        WHERE 
            qa.user_id = ?
    `;

    db.query(sql, [userId], (err: Error | null, results: any) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).json(results);
    });
});

updateprofile.get('/personality-options', (req: UserRequest, res: express.Response) => {
    db.query('SELECT name, id FROM personalities', (err, results) => {
      if (err) {
        console.error('Error fetching personalities:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      res.status(200).json({ personalities: results });
    });
  });
  
  updateprofile.get('/personalities', verifyUser, (req: UserRequest, res: express.Response) => {
    const userId = req.userId;
  
    console.log(`Fetching personalities for UserId: ${userId}`);
  
    const query = `
      SELECT p.id, p.name, p.visible, p.created_at, p.updated_at 
      FROM personalities p
      JOIN user_personalities up ON p.id = up.personality_id
      WHERE up.user_id = ?`;
  
    db.query<RowDataPacket[]>(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching personalities:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No personalities found for this user' });
      }
  
      res.status(200).json({ personalities: results });
    });
  });

  updateprofile.get('/personality-options', (req: UserRequest, res: express.Response) => {
    db.query('SELECT name, id FROM personalities', (err, results) => {
      if (err) {
        console.error('Error fetching personalities:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      res.status(200).json({ personalities: results });
    });
  });

  updateprofile.post('/personality', verifyUser, (req: UserRequest, res: express.Response) => {
    const { personalities } = req.body;
    const userId = req.userId;
  
    if (!userId || !Array.isArray(personalities)) {
      return res.status(400).json({ message: 'Invalid request' });
    }
  
    // Start a transaction
    db.beginTransaction(err => {
      if (err) {
        console.error('Transaction Start Error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      // Delete existing personalities
      db.query('DELETE FROM user_personalities WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          console.error('Error deleting personalities:', err);
          db.rollback(() => {
            return res.status(500).json({ message: 'Internal Server Error' });
          });
        } else {
          // Insert new personalities
          const query = 'INSERT INTO user_personalities (user_id, personality_id) VALUES ?';
          const values = personalities.map((personalityId: number) => [userId, personalityId]);
  
          db.query(query, [values], (err, results) => {
            if (err) {
              console.error('Error inserting personalities:', err);
              db.rollback(() => {
                return res.status(500).json({ message: 'Internal Server Error' });
              });
            } else {
              // Commit the transaction
              db.commit(err => {
                if (err) {
                  console.error('Transaction Commit Error:', err);
                  db.rollback(() => {
                    return res.status(500).json({ message: 'Internal Server Error' });
                  });
                } else {
                  res.status(200).json({ message: 'Personalities updated successfully' });
                }
              });
            }
          });
        }
      });
    });
  });

  export default updateprofile;


