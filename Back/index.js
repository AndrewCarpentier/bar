const bodyParser = require("body-parser");
const express = require("express");
const cookie = require("cookie-parser");
const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
const configDB = require("./db/configDB");
const cors = require("cors");
const port = 8000;
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookie());
app.use(bodyParser.json());

mongoose
  .connect(configDB.mongoDb.uri, configDB.mongoDb.options)
  .then(() => {
    console.log("Connection mongoDB OK");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(routes);

app.use("*", (req, res) => {
  res.status(400).end();
});

const Etablishment = require("./schemas/etablishmentSchema");

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("command", async (value) => {
    const etablishment = await Etablishment.findById(value.etablishmentId);
    etablishment.commandList.push({
      command: value.cart,
      validate: false,
      table: value.table,
      price: value.price,
    });
    await Etablishment.findByIdAndUpdate(value.etablishmentId, etablishment);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

// Lancement du serveur Node.js
server.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
