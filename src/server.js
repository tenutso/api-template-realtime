const express = require("express");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const namespace = io.of(/^\/\w+$/);
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

app.use(cors());
app.use((req, res, next) => {
  req.db = db;
  next();
});

namespace.use((socket, next) => {
  socket.db = db;
  next();
});

require("./messages")(namespace);
app.use("/v1", require("./routes"));

MongoClient.connect(process.env.DATABASE_URL, async (err, client) => {
  if (err) return console.error(err);
  db = client.db();
  httpServer.listen(process.env.PORT, function() {
    console.log("Server is running on Port:", process.env.PORT);
  });
});
