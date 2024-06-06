import { Router, Request, Response } from 'express';
import { db } from "../../../../db/db";
import { AdminRequest } from '../../../types/types';

const promotions = Router();

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

promotions.delete('/:id', (req: AdminRequest, res: Response) => {
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
