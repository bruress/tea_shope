import pool from '../config/db.js'
import express from 'express';
import { sendMail } from '../mailService.js';

const router = express.Router();

router.post("/sendMail", async (req, res) => {
  const { userEmail, emailSubject, emailBody } = req.body;

  if (!userEmail || !emailSubject || !emailBody) {
    return res.status(400);
  }

  try {

    await pool.query(
      `INSERT INTO tea_shop_schema.subscription (email_sub, subscription) VALUES ($1, true)`,
      [userEmail]
    );

    await sendMail(userEmail, emailSubject, emailBody);
    res.status(200);

    
  } catch (error) {
    res.status(400);
  }
});

export default router;
