const mongodb = require("./database");

module.exports = async (namespace) => {
  const db = await mongodb();
  //const db = test.db();
  const collection = db.collection("templates");
  const changeStream = collection.watch({ fullDocument: "updateLookup" });
  namespace.on("connection", async (socket) => {
    const eventSpace = socket.nsp;
    const eventId = socket.nsp.name;
    console.log(eventId, socket.id);
    eventSpace.emit("HELLO", "Connected Successfully");
    socket.on("disconnecting", (reason) => {
      console.log(reason);
    });

    changeStream.on("change", (next) => {
      eventSpace.emit("UPDATE", next.fullDocument);
      console.log(next.fullDocument);
    });
  });
};
