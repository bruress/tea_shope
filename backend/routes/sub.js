import express from "express";
import jwt from "jsonwebtoken";
import pool from "../database.js";
import { protect } from "../middleware/auth.js";
import { sendMail } from "../mailService.js";

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_END === 'production',
    sameSite: 'Strict',
    maxAge: 30*24*60*60*1000
}

router.post('/sub', async (req, res) => {
    const {email_sub} = req.body;
    if (!email_sub) {
        return res.status(400);
    };

    const userId = req.user ? req.user.user_id: null;

    try {

        const exist = await pool.query(`SELECT * from tea_shop_schema.subscription WHERE email_sub = $1`, [email_sub]);

        if (exist.rows.length>0) {
            return res.status(200).json({exist: true});
        }

        await pool.query(`INSERT INTO tea_shop_schema.subscription (email_sub, subscription, user_id)
                        VALUES ($1, $2, $3) `,
                        [email_sub, true, userId]
        );
        res.status(200).json({success: true});


        const emailSubject = "Thank you for subscribing!"; //title
        const emailBody = `
            Hello,
            
            You have successfully subscribed to our tea newsletter. 
            You will now receive updates on our latest teas and promotions.
            
            Enjoy your tea time with us!🍵
        `
        await sendMail(email_sub, emailSubject, emailBody);


    } catch(err) {
        res.status(500).json({success: false});
    }
});

export default router;