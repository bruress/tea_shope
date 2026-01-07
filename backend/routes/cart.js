import express from 'express';
import pool from '../database.js';
import { protect as authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// get user's cart
router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.user_id; // ✅ исправлено

    try {
        const cartRes = await pool.query(
            `SELECT cart_item.cart_item_id, cart_item.quantity, tea.tea_id, tea.tea_name, tea.price, tea.image_tea
             FROM tea_shop_schema.cart_item
             JOIN tea_shop_schema.tea ON cart_item.tea_id = tea.tea_id
             JOIN tea_shop_schema.cart ON cart_item.cart_id = cart.cart_id
             WHERE cart.user_id = $1`,
             [userId]
        );

        res.json({ items: cartRes.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// add tea to cart
router.post("/", authMiddleware, async (req, res) => {
    const userId = req.user.user_id;
    const { tea_id, quantity } = req.body;

    try {
        const cartResult = await pool.query(
            "SELECT cart_id FROM tea_shop_schema.cart WHERE user_id = $1",
            [userId]
        );

        let cartId;
        if (cartResult.rows.length === 0) {
            const newCart = await pool.query(
                "INSERT INTO tea_shop_schema.cart(user_id) VALUES($1) RETURNING cart_id",
                [userId]
            );
            cartId = newCart.rows[0].cart_id;
        } else {
            cartId = cartResult.rows[0].cart_id;
        }

        const existing = await pool.query(
            "SELECT cart_item_id, quantity FROM tea_shop_schema.cart_item WHERE cart_id = $1 AND tea_id = $2",
            [cartId, tea_id]
        );

        if (existing.rows.length > 0) {
            const newQuantity = existing.rows[0].quantity + quantity;
            await pool.query(
                "UPDATE tea_shop_schema.cart_item SET quantity = $1 WHERE cart_item_id = $2",
                [newQuantity, existing.rows[0].cart_item_id]
            );
        } else {
            await pool.query(
                "INSERT INTO tea_shop_schema.cart_item(cart_id, tea_id, quantity) VALUES($1, $2, $3)",
                [cartId, tea_id, quantity]
            );
        }

        res.json({ message: "Cart updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// update quantity
router.put("/item/:itemId", authMiddleware, async (req, res) => {
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    try {
        await pool.query(
            "UPDATE tea_shop_schema.cart_item SET quantity = $1 WHERE cart_item_id = $2",
            [quantity, itemId]
        );
        res.json({ message: "Quantity updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// delete tea
router.delete("/item/:itemId", authMiddleware, async (req, res) => {
    const itemId = req.params.itemId;

    try {
        await pool.query(
            "DELETE FROM tea_shop_schema.cart_item WHERE cart_item_id = $1",
            [itemId]
        );
        res.json({ message: "Item removed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
