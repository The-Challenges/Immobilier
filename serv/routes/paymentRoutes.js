const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PEaQz03qZSPZMZQ9tQkZCxcpeO1gSrjfxzSAh0s2QpLcPsYYSVXgG0E2oLPwV8Jt7gXlZqOcpHvhbYH0zpm7PPJ00y3rZi628');

router.post('/pay', async (req, res) => {
    const { amount, currency } = req.body; 

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card']
      });

      res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error making payment' });
    }
  });


router.post('/pay/:id', async (req, res) => {
  const paymentId = req.params.id;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    res.status(200).json({ status: paymentIntent.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error verifying payment' });
  }
});

module.exports = router;