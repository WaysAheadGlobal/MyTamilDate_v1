import sgMail from "@sendgrid/mail";
import { Router } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import Stripe from "stripe";
import { db } from "../../../../db/db";

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

                    db.query<ResultSetHeader>("INSERT INTO payments (customer_id, amount, discount_amount, price_id, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)", [object.customer, object.amount_paid, object.lines.data[0].discount_amounts?.[0].amount ?? 0, object.lines.data[0]?.plan?.id, result[0].id], async (err) => {
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
                        });

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
        case 'customer.subscription.created': {
            const object = event.data.object;

            db.beginTransaction(err => {
                if (err) {
                    throw err;
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

                    db.query<ResultSetHeader>("INSERT INTO subscriptions (user_id, name, stripe_id, stripe_status, stripe_plan, quantity, ends_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?), NOW(), NOW())", [result[0].id, "default", object.id, object.status, object.items.data[0].plan.id, object.items.data[0].quantity, object.current_period_end], (err, _) => {
                        if (err) {
                            db.rollback(() => {
                                console.log(err);
                            });
                            return;
                        }

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

            break;
        }
        case 'customer.subscription.updated': {
            const object = event.data.object;

            db.query<RowDataPacket[]>("UPDATE subscriptions SET stripe_status = ?, ends_at = FROM_UNIXTIME(?) WHERE stripe_id = ?", [object.status, object.current_period_end, object.id], (err, _) => {
                if (err) {
                    console.log(err);
                }
            });

            break;
        }
        case 'customer.subscription.deleted': {
            const object = event.data.object;

            db.query<RowDataPacket[]>("UPDATE subscriptions SET stripe_status = ?, ends_at = NOW() WHERE stripe_id = ?", [object.status, object.id], (err, _) => {
                if (err) {
                    console.log(err);
                }
            });

            break;
        }
        default:
            console.log(event.type);
        // Unhandled event type
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

export default webhookRouter;