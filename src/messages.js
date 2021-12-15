module.exports = (namespace) => {
  namespace.on("connection", async (socket) => {
    const eventSpace = socket.nsp;
    const eventId = socket.nsp.name;
    console.log(eventId, socket.id);
    eventSpace.emit("HELLO", "Connected Successfully");
    socket.on("disconnecting", (reason) => {
      console.log(reason);
    });

    const collection = socket.db.collection("sessions");
    const changeStream = collection.watch({ fullDocument: "updateLookup" });
    changeStream.on("change", (next) => {
      eventSpace.emit("UPDATE", next.fullDocument);
      console.log(next.fullDocument);
    });
  });
};
