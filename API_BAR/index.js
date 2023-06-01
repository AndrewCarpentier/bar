const mongoose = require("mongoose");
const config = require("./db/configDB");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
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
const commandRouter = require("./routes/command");
app.use("", beersRouter);
app.use("", beersRouter);
app.use("", adminRouter);
app.use("", softRouter);
app.use("", foodRouter);
app.use("", cocktailRouter);
app.use("", paymentRouter);
app.use("", commandRouter);

const CommandSchema = require("./schemas/commandSchema");
const Command = mongoose.model("Command", CommandSchema);
const BeerSchema = require("./schemas/beerSchema");
const Beer = mongoose.model("Beer", BeerSchema);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("command", (value) => {
    const beers = [];
    value.map((v) => {
      const beer = new Beer({
        _id: v.id,
        name: v.name,
        price: v.price,
        img: v.image,
      });
      beers.push({ beer : beer, count: v.count, price: v.price });
    });
    const command = new Command({
      beers
    });
    command
      .save()
      .then(() => {
        console.log("command enregistrer");
      })
      .catch((error) => {
        console.log(error);
      });
    socket.broadcast.emit("adminCommand", command);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

server.listen(port, () =>
  console.log(`Notre application est démarrée sur : http://localhost:${port}`)
);
