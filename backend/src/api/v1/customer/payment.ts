import { Router } from "express";
import Stripe from "stripe";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";
import { verifyUser } from "../../../middleware/verifyUser";
import { RowDataPacket } from "mysql2";

const payment = Router();

payment.use(verifyUser);

payment.post("/create-checkout-session", async (req: UserRequest, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,

                },
            ],
            mode: "subscription",
            success_url: `${process.env.URL}/user/home`,
            cancel_url: `${process.env.URL}/selectplan`,
            customer: customerId,
        });

        res.status(200).json({ url: session.url });
    });
});

payment.post("/create-payment-method", async (req: UserRequest, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const paymentMethodId = req.body.paymentMethodId;
    const {
        /* cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCvc, */
        token
    } = req.body;

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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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

payment.get("/methods", async (req: UserRequest, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

export default payment;