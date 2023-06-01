const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  router.get('/config', (req, res)=>{
    res.send({
      publishableKey : process.env.STRIPE_PUBLISHABLE_KEY
    })
  })

  // router.post("/payment", cors(), async (req, res) => {
  //   console.log("stripe-routes.js 9 | route reached", req.body);
  //   let { amount, id } = req.body;
  //   console.log("stripe-routes.js 10 | amount and id", amount, id);
  //   try {
  //     const payment = await stripe.paymentIntents.create({
  //       amount: amount,
  //       currency: "EUR",
  //       description: "BAR table 1",
  //       payment_method: id,
  //       confirm: true,
  //     });
  //     console.log("stripe-routes.js 19 | payment", payment);
  //     res.json({
  //       clientSecret: paymentIntent.client_secret,
  //       message: "Payment Successful",
  //       success: true,
  //     });
  //   } catch (error) {
  //     console.log("stripe-routes.js 17 | error", error);
  //     res.json({
  //       message: "Payment Failed",
  //       success: false,
  //     });
  //   }
  // });

  router.post('/payment', async(req,res)=>{
    const {price} = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "eur",
        amount: price,
        description : "BAR table 1",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  })

module.exports = router;