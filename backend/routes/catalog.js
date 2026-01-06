import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/tea_type', async(req, res) => { //загужаем типы чая
    const tea_type = await pool.query(`SELECT * FROM tea_shop_schema.tea_type`);
    res.json(tea_type.rows); // возвращаем строчки
});

router.get('/tea_type/:id', async(req, res) => { //:id -динамический параметр
    const {id} = req.params; // деструктиризация объекта - берем id из url и создаем переменную
    const type_res = await pool.query(`SELECT * FROM tea_shop_schema.tea_type WHERE tea_type_id=$1`,
        [id]
    );
    const tea_res = await pool.query(`SELECT * FROM tea_shop_schema.tea WHERE tea_type_id=$1`,
    [id]
    );

    res.json({ //ответ от запроса
        teas: tea_res.rows,
        types: type_res.rows[0]
        
    });

});

export default router;