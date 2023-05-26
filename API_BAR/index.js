const mongoose = require("mongoose");
const config = require("./db/configDB");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = 8000;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    cors({
      origin: "*",
    })
  );

mongoose
  .connect(config.mongoDb.uri, config.mongoDb.options)
  .then(() => {
    console.log("Connection mongoDB Ok");
  })
  .catch((err) => console.log(err));

const beersRouter = require("./routes/beers");
const adminRouter = require("./routes/admin");
const softRouter = require("./routes/soft");
const foodRouter = require("./routes/food");
const cocktailRouter = require("./routes/cocktail");
const paymentRouter = require("./routes/payment");
app.use("", beersRouter);
app.use("", beersRouter);
app.use("", adminRouter);
app.use("", softRouter);
app.use("", foodRouter);
app.use("", cocktailRouter);
app.use("", paymentRouter);

app.listen(port, () =>
  console.log(`Notre application est démarrée sur : http://localhost:${port}`)
);
