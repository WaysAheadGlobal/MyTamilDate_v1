import { Router, Request, Response } from 'express';
import { db } from "../../../../db/db";
import { AdminRequest } from '../../../types/types';

const promotions = Router();

// Get all promotional codes
promotions.get('/', (req: AdminRequest, res: Response) => {
    const { limit = 50, pageNo = 1 } = req.query;
    const limitNum = Number(limit);
    const pageNoNum = Number(pageNo);
    const offset = Math.max(0, (pageNoNum - 1) * limitNum); // Ensure offset is non-negative

    if (isNaN(limitNum) || isNaN(pageNoNum)) {
        return res.status(400).json({ message: 'Invalid limit or pageNo' });
    }

    const countSql = 'SELECT COUNT(*) AS total FROM promotional_codes WHERE deleted_at IS NULL';
    const dataSql = `
        SELECT * FROM promotional_codes WHERE deleted_at IS NULL
        LIMIT ? OFFSET ?
    `;

    db.query(countSql, (err, countResult) => {
        if (err) {
            console.error('Error fetching total count:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const total = countResult[0].total;

        db.query(dataSql, [limitNum, offset], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ total, results });
        });
    });
});




// Get promotional code by ID
promotions.get('/:id', (req: AdminRequest, res: Response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM promotional_codes WHERE id = ? AND deleted_at IS NULL';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Promotional code not found' });
        }
        res.status(200).json(results[0]);
    });
});

// Create a new promotional code
promotions.post('/', (req: AdminRequest, res: Response) => {
    const {
        promo_id, amount_off, percent_off, available_to, available_from,
        applies_to, max_redemptions, once_per_user, stripe_id
    } = req.body;
    
    // Check if required fields are missing
    if (!promo_id || max_redemptions == null) {
        return res.status(400).json({ message: 'Fields are required' });
    }

    // Check if promo_id already exists
    const checkSql = `
        SELECT COUNT(*) AS count FROM promotional_codes WHERE promo_id = ?
    `;
    const checkValues = [promo_id];

    db.query(checkSql, checkValues, (err, rows) => {
        if (err) {
            console.error('Error checking promo_id:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const count = rows[0].count;
        if (count > 0) {
            return res.status(400).json({ message: 'Promo ID already exists. Please choose a unique ID.' });
        }

        // If promo_id is unique, proceed with insertion
        const insertSql = `
            INSERT INTO promotional_codes (
                promo_id, amount_off, percent_off, available_to, available_from,
                applies_to, max_redemptions, once_per_user, stripe_id, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const insertValues = [
            promo_id, amount_off, percent_off, available_to, available_from,
            applies_to, max_redemptions, once_per_user, stripe_id
        ];

        db.query(insertSql, insertValues, (err, result) => {
            if (err) {
                console.error('Error creating promotional code:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            res.status(201).json({ message: 'Promotional code created successfully', id: result.insertId });
        });
    });
});


// Edit a promotional code
promotions.put('/:id', (req: AdminRequest, res: Response) => {
    const { id } = req.params;
    const {
        promo_id, amount_off, percent_off, available_to, available_from,
        applies_to, max_redemptions, once_per_user, stripe_id
    } = req.body;

    const sql = `
        UPDATE promotional_codes SET
            promo_id = ?, amount_off = ?, percent_off = ?, available_to = ?, available_from = ?,
            applies_to = ?, max_redemptions = ?, once_per_user = ?, stripe_id = ?, updated_at = NOW()
        WHERE id = ? AND deleted_at IS NULL
    `;
    const values = [
        promo_id, amount_off, percent_off, available_to, available_from,
        applies_to, max_redemptions, once_per_user, stripe_id, id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error updating data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Promotional code not found or already deleted' });
        }

        res.status(200).json({ message: 'Promotional code updated successfully' });
    });
});

// Soft delete a promotional code
promotions.delete('/delete/:id', (req: AdminRequest, res: Response) => {
    const { id } = req.params;
    const sql = 'UPDATE promotional_codes SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL';
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error deleting data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Promotional code not found or already deleted' });
        }

        res.status(200).json({ message: 'Promotional code deleted successfully' });
    });
});

export default promotions;
