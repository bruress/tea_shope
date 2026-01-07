import express from "express";
import pool from "../database.js";
import { protect as authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Создание нового заказа из корзины
router.post("/", authMiddleware, async (req, res) => {
    const userId = req.user.user_id; // <- правильное поле

    try {
        // Получаем корзину пользователя
        const cartRes = await pool.query(
            "SELECT cart_id FROM tea_shop_schema.cart WHERE user_id = $1",
            [userId]
        );

        if (cartRes.rows.length === 0) {
            return res.status(400).json({ message: "Cart not found" });
        }

        const cartId = cartRes.rows[0].cart_id;

        // Получаем товары из корзины
        const cartItems = await pool.query(
            "SELECT * FROM tea_shop_schema.cart_item WHERE cart_id = $1",
            [cartId]
        );

        if (cartItems.rows.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Создаем заказ
        const orderResult = await pool.query(
            "INSERT INTO tea_shop_schema.orders(user_id, status) VALUES ($1, $2) RETURNING order_id",
            [userId, "pending"]
        );

        const orderId = orderResult.rows[0].order_id;

        // Переносим все элементы из корзины в order_item
        for (const item of cartItems.rows) {
            await pool.query(
                "INSERT INTO tea_shop_schema.order_item(order_id, tea_id, quantity) VALUES ($1, $2, $3)",
                [orderId, item.tea_id, item.quantity]
            );
        }

        // Очищаем корзину пользователя
        await pool.query(
            "DELETE FROM tea_shop_schema.cart_item WHERE cart_id = $1",
            [cartId]
        );

        res.json({ message: "Order created", orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Получение заказов пользователя
router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.user_id;

    try {
        const orders = await pool.query(
            "SELECT * FROM tea_shop_schema.orders WHERE user_id = $1",
            [userId]
        );

        res.json({ orders: orders.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
