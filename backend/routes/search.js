import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { search } = req.query;

    try {
        let query = `
            SELECT *
            FROM tea_shop_schema.tea
        `;
        const values = [];

        if (search) {
            query += `
                WHERE
                    tea_name ILIKE $1
                    OR composition ILIKE $1
            `;
            values.push(`%${search}%`);
        }

        query += ` ORDER BY tea_id`;

        const { rows } = await pool.query(query, values);
        res.json(rows);

    } catch (err) {
        console.error('Tea search error:', err);
        res.status(500).json({ message: 'Failed to load tea' });
    }
});

export default router;
