import express from 'express'; // подключим модуль
import cors from'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js';
import subRoutes from './routes/sub.js';
import catRoutes from './routes/catalog.js';
import mailRoutes from './routes/mail.js';
import cartRoutes from './routes/cart.js';
import ordersRoutes from './routes/orders.js';

dotenv.config();

const app  = express(); // вызываем модуль express
const port = process.env.PORT || 3300 // константа порта, env - если хостить, а так для локалочки

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, //enabled cookies send requests
}));
app.use(cookieParser()); // парсить cookie from request


app.use("/api/auth", authRoutes);
app.use("/api/sub", subRoutes);
app.use("/api/catalog", catRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(port, () => {
    console.log('Server listening on: http://localhost:%s', port); // вывод в консоль
});


