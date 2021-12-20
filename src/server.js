const express = require("express");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const namespace = io.of(/^\/\w+$/);
const cors = require("cors");
const mongodb = require("./database");
require("dotenv").config();

app.use(cors());
app.use(async (req, res, next) => {
  req.db = await mongodb();
  next();
});

namespace.use(async (socket, next) => {
  socket.db = await mongodb();
  next();
});

require("./messages")(namespace);
app.use("/v1", require("./routes"));

httpServer.listen(process.env.PORT, function () {
  console.log("Server is running on Port:", process.env.PORT);
});
