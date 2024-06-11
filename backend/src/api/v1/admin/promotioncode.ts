import { Router, Request, Response } from 'express';
import { db } from "../../../../db/db";
import { AdminRequest } from '../../../types/types';

const promotions = Router();

// Get all promotional codes
promotions.get('/', (req: AdminRequest, res: Response) => {
    const sql = 'SELECT * FROM promotional_codes WHERE deleted_at IS NULL';

    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json(results);
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
    if (
        !promo_id || amount_off == null || percent_off == null || !available_to || !available_from ||
        !applies_to || max_redemptions == null || once_per_user == null || !stripe_id
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    const sql = `
        INSERT INTO promotional_codes (
            promo_id, amount_off, percent_off, available_to, available_from,
            applies_to, max_redemptions, once_per_user, stripe_id, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const values = [
        promo_id, amount_off, percent_off, available_to, available_from,
        applies_to, max_redemptions, once_per_user, stripe_id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error creating data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Promotional code created successfully', id: result.insertId });
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
