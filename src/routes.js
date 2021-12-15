const express = require("express");
const router = express();

router.get("/", async (req, res) => {
  res.send(
    await req.db
      .collection("sessions")
      .find()
      .toArray()
  );
});

module.exports = router;
