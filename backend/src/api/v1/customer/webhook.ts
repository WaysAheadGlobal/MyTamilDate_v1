import { Router } from "express";
import moment from "moment";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import Stripe from "stripe";
import { db } from "../../../../db/db";
import sgMail from "@sendgrid/mail";

const webhookRouter = Router();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

webhookRouter.post('/', async (request, response) => {
    const sig = request.headers['stripe-signature']!;

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err: any) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'invoice.paid': {
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.   

            const object = event.data.object;

            console.log("1")

            db.beginTransaction(err => {
                if (err) {
                    db.rollback(() => {
                        console.log(err);
                    });
                    return;
                }

                db.query<RowDataPacket[]>("SELECT id FROM users WHERE stripe_id = ?", [object.customer], (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            console.log(err);
                        });
                        return;
                    }

                    if (result.length === 0) {
                        db.rollback(() => {
                            console.log("User not found");
                        });
                        return;
                    }

                    db.query<ResultSetHeader>("INSERT INTO payments (customer_id, amount, discount_amount, price_id, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)", [object.customer, object.amount_paid, object.discount ?? 0, object.lines.data[0]?.plan?.id, result[0].id], (err, _) => {
                        if (err) {
                            db.rollback(() => {
                                console.log(err);
                            });
                            return;
                        }

                        const query = "INSERT INTO subscriptions (user_id, name, stripe_id, stripe_status, stripe_plan, quantity, ends_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?), NOW(), NOW())";

                        const values = [
                            result[0].id,
                            "default",
                            object.subscription,
                            object.status,
                            object.lines.data[0]?.plan?.id,
                            object.lines.data[0]?.quantity,
                            object.lines.data[0]?.period?.end,
                            result[0].id
                        ];

                        db.query<ResultSetHeader>(query, values, async (err, _) => {
                            if (err) {
                                db.rollback(() => {
                                    console.log(err);
                                });
                                return;
                            }

                            await sgMail.send({
                                to: object.customer_email!,
                                from: process.env.EMAIL_HOST!,
                                subject: "Payment Successful",
                                text: `
                                Dear customer,

                                Your payment was successful. 
                                Thank you for subscribing to our service.
                                
                                This is your invoice:
                                ${object.hosted_invoice_url}

                                Regards,
                                The MTD Team
                            `
                            })

                            db.commit(err => {
                                if (err) {
                                    db.rollback(() => {
                                        console.log(err);
                                    });
                                    return;
                                }

                                console.log("Success");
                            });
                        });
                    });
                });
            });

            break;
        }
        case 'invoice.payment_failed': {
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            /* console.log(event.data.object); */

            const object = event.data.object;

            break;
        }
        case 'checkout.session.completed': {
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            break;
        }
        default:
        /* console.log(event.data.object); */
        // Unhandled event type
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

export default webhookRouter;