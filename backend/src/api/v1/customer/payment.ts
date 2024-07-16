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
            allow_promotion_codes: true,
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

export default payment;