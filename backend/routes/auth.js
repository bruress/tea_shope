import express from 'express'; // фреймворк для создания сервера
import bcrypt from 'bcrypt'; // для хэширования пароля
import jwt from 'jsonwebtoken'; // для шифрования токена
import pool  from '../config/db.js'; // запросы к бд
import { protect } from '../middleware/auth.js';
import {body, validationResult} from 'express-validator';
const router = express.Router();


const cookieOptions = { // for security
    httpOnly: true, //cookie нельзя прочитать через js (document.cookie) - снижает риск кражи через xss
    secure: process.env.NODE_ENV == 'production', //only send cookies from https
    sameSite: 'Strict', //самая строгая защита, блокирует отправку cookie при кросс-длменных запросах (CSRF защита)
    maxAge: 30*24*60*60*1000 //cookie will deleted after 30 days
}

const generateToken = (user_id) => { // signes token to user_id
    return jwt.sign({user_id}, process.env.JWT_SECRET, {
        expiresIn:'30d' // due token's life
    });
}


//Register a new user

//router.post('/register', [

//  //   body("user_name"),
//  //   body("email").notEmpty().trim().isEmail().withMessage('Not a valid e-mail address')
//    // .isLength({max:74}).withMessage('The email address must not exceed 74 characters.')
//     //.matches("/^[a-zA-Z0-9@._-]+$/").withMessage("The email address cannot contain special characters.")
//    // body("telephone_number"),
//     //body("password")

        
//     ],
//     async (req, res) => { //async - значит внутри можно ожидать промисы await

//     const errors = validationResult(req);


router.post('/register',  async (req, res) => { //async - значит внутри можно ожидать промисы await

    const {user_name, email, password, telephone_number} = req.body; //название полей из фронта

    if (!user_name || !email || !password || !telephone_number) { // если какое-то поле не заполнено
        return res.status(400).json({message: "Please provude all required fields"}); // bad request
    }

    // pool.query - sql запрос
    const userExists = await pool.query(`SELECT * FROM tea_shop_schema.users WHERE email = $1`, [email]); // $1 - безопасный способ ставки переменных: защищает от sql-инъекций

    if (userExists.rows.length>0) { // массив строк, которые вернул запрос. проверяются все строчки в бд?
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10); // хэширование пароля, 10-how many times

    const newUser = await pool.query (
        `INSERT INTO tea_shop_schema.users (user_name, email, password_hash, telephone_number) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, telephone_number`,
        [user_name, email, hashedPassword, telephone_number]
        // безопасная вставка + возвращение полей новой записи (чтобы не юзать select)
    );


    const token = generateToken(newUser.rows[0].user_id); // объект с даннными вставленной строки
    res.cookie('token', token, cookieOptions); //устанавливает cookie

    return res.status(201).json({user: newUser.rows[0]}); // сатус создания ресурса

});

// login

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Please provedi all required fields'});
    }

    const user = await pool.query(`SELECT * FROM tea_shop_schema.users WHERE email = $1`, [email]);

    if (user.rows.length ==0) {
        return res.status(200).json({err_stat:true});
    }
    
    const userData = user.rows[0];
    const isMatch = await bcrypt.compare(password, userData.password_hash);

    if (!isMatch) {
        return res.status(200).json({err_stat:true});
    }

    const token = generateToken(userData.user_id);

    res.cookie('token', token, cookieOptions);

    res.json({user: {user_id: userData.user_id, email: userData.email}});

    console.log(req.body);
});

//userinfo?
router.get('/userinfo', protect, async(req, res) => {
    res.json(req.user)
    //return info of the logged in user from protect middleware
});

//logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', {...cookieOptions, maxAge: 1});
    res.json({message: 'Logged out successfully'});
});

router.get("/me", protect, async (req, res) => {
    res.json(req.user);
});

export default router;