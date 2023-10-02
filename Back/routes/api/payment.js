const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51N4mWhBkG9HN42fCDlThYvmhcTUyZSdG54IkWfhXThIwKHYof3d3PPeAKSNHuzY5cditzZtt9cNJAErHtyJxqcaE00Fplvo2Hu"
);

router.get("/config", (req, res) => {
  res.send({
    publishableKey:
      "pk_test_51N4mWhBkG9HN42fCoqff8OmFm3VwPTVIsIwDfzhSbyNHYnn25zZNFclx8VE6On1bjRTYImds9MtM6zvEAggOoYI600JEawMZYp",
  });
});

router.post("/payment", async (req, res) => {
  const { price, table } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: price,
      description: "BAR table " + table,
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
});

module.exports = router;
