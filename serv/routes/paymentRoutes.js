const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PEaQz03qZSPZMZQ9tQkZCxcpeO1gSrjfxzSAh0s2QpLcPsYYSVXgG0E2oLPwV8Jt7gXlZqOcpHvhbYH0zpm7PPJ00y3rZi628');

// POST endpoint for creating a payment intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,  // Amount is expected to be in the smallest currency unit (e.g., cents)
            currency: currency,
            payment_method_types: ['card']
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint to confirm a payment
router.post('/confirm-payment/:paymentIntentId', async (req, res) => {
    const { paymentIntentId } = req.params;
    const { paymentMethodId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId
        });
        res.json({ status: paymentIntent.status });
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
