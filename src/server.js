const express = require("express");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const namespace = io.of(/^\/\w+$/);
const cors = require("cors");
const { MongoClient } = require("mongodb");
const messages = require("./messages");
require("dotenv").config();
let db;

app.use(cors());
app.use(async (req, res, next) => {
  req.db = db;

  next();
});

namespace.use(async (socket, next) => {
  //socket.db = db;
  // socket.io middleware
  next();
});

app.use("/v1", require("./routes"));

httpServer.listen(process.env.PORT, async () => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    db = client.db();
    messages.initialize(namespace, db);
    console.log("MongoDB is running");
    console.log("Server is running on Port:", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
