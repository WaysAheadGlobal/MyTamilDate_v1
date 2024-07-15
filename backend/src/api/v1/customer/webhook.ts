import { Router } from "express";
import Stripe from "stripe";

const webhookRouter = Router();

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_b88af3ba29f8827823a1efd0d0165bd47eee3805988dfc4cef3df7260c82dacd";

webhookRouter.post('/', (request, response) => {
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
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

export default webhookRouter;