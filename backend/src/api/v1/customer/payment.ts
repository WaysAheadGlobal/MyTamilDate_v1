import { Router } from "express";
import Stripe from "stripe";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";
import { verifyUser } from "../../../middleware/verifyUser";
import { RowDataPacket } from "mysql2";

const payment = Router();

payment.use(verifyUser);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

payment.post("/create-payment-method", async (req: UserRequest, res) => {
    const paymentMethodId = req.body.paymentMethodId;
    const { token } = req.body;

    db.query<RowDataPacket[]>("SELECT stripe_id FROM users WHERE id = ?", [req.userId], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length === 0) {
            return res.status(404).send("User not found");
        }

        const customerId = result[0].stripe_id;

        try {
            const paymentMethod = await stripe.paymentMethods.create({
                type: "card",
                card: {
                    token: token
                },
            });

            await stripe.paymentMethods.attach(paymentMethod.id, {
                customer: customerId,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        try {
            await stripe.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        res.status(200).send({ message: "Payment method attached successfully" });
    });
});

payment.post("/create-subscription", async (req: UserRequest, res) => {
    const priceId = req.body.priceId;

    db.query<RowDataPacket[]>("SELECT stripe_id FROM users WHERE id = ?", [req.userId], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length === 0) {
            return res.status(404).send("User not found");
        }

        const customerId = result[0].stripe_id;

        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: "card",
        });

        if (paymentMethods.data.length === 0) {
            res.status(200).json({ message: "No payment method found", url: "/addpaymentmethod?type=subscribe" });
            return;
        }

        try {
            await stripe.customers.update(customerId, {
                email: req.user.email,
            });
            await stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                default_payment_method: paymentMethods.data[0].id,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        res.status(200).send({ message: "Subscription created successfully" });
    });
});

payment.post("/create-subscription/:coupon", async (req: UserRequest, res) => {
    const priceId = req.body.priceId;
    const coupon = req.params.coupon;
    const productId = req.body.product;

    const [result] = await db.promise().query<RowDataPacket[]>("SELECT id, applies_to, once_per_user FROM promotional_codes WHERE stripe_id = ?", [coupon]);

    const promoId = result[0].id;

    if (result.length === 0) {
        return res.status(404).json({ message: "Invalid Coupon Code" });
    }

    if (result[0].applies_to !== productId) {
        console.log(result[0].applies_to, productId);
        return res.status(404).json({ message: "This coupon is not applicable for the selected product" });
    }

    if (result[0].once_per_user) {
        const [usage] = await db.promise().query<RowDataPacket[]>("SELECT id FROM promotional_codes_usages WHERE promotional_codes_id = ? AND user_id = ?", [result[0].id, req.userId]);

        if (usage.length > 0) {
            return res.status(404).json({ message: "Coupon can only be used once per user" });
        }
    }

    db.query<RowDataPacket[]>("SELECT stripe_id FROM users WHERE id = ?", [req.userId], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length === 0) {
            return res.status(404).send("User not found");
        }

        const customerId = result[0].stripe_id;

        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: "card",
        });

        if (paymentMethods.data.length === 0) {
            res.status(200).json({ message: "No payment method found", url: "/addpaymentmethod?type=subscribe" });
            return;
        }

        try {
            await stripe.customers.update(customerId, {
                email: req.user.email,
            });
            await stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                default_payment_method: paymentMethods.data[0].id,
                discounts: [
                    {
                        coupon: coupon,
                    }
                ]
            });
            await db.promise().query("INSERT INTO promotional_codes_usages (promotional_codes_id, user_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())", [promoId, req.userId]);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        res.status(200).send({ message: "Subscription created successfully" });
    });
});

payment.get("/methods", async (req: UserRequest, res) => {
    db.query<RowDataPacket[]>("SELECT stripe_id FROM users WHERE id = ?", [req.userId], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length === 0) {
            return res.status(404).send("User not found");
        }

        const customerId = result[0].stripe_id;
        
        try {
            const paymentMethods = await stripe.paymentMethods.list({
                customer: customerId,
                type: "card",
            });

            let data: {
                id: string,
                brand?: string,
                last4?: string,
            }[] = [];

            paymentMethods.data.forEach((method) => {
                data.push({
                    id: method.id,
                    brand: method.card?.brand,
                    last4: method.card?.last4,
                });
            });

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    });
});

payment.get("/check-valid-coupon/:product/:coupon", async (req: UserRequest, res) => {
    try {
        const [result] = await db.promise().query<RowDataPacket[]>("SELECT applies_to FROM promotional_codes WHERE stripe_id = ?", [req.params.coupon]);

        if (result.length === 0) {
            return res.status(200).json({ valid: false });
        }

        if (result[0].applies_to !== req.params.product) {
            return res.status(200).json({ valid: false, message: "This coupon is not applicable for the selected product" });
        }

        const coupon = await stripe.coupons.retrieve(req.params.coupon);

        if (coupon.valid) {
            res.status(200).send({
                valid: true,
                percentOff: coupon.percent_off,
                amountOff: coupon.amount_off,
                products: coupon.applies_to?.products,
            });
        } else {
            res.status(200).send({ valid: false });
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ valid: false });
    }
});

export default payment;