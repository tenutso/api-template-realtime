const express = require("express");
const router = express();

router.get("/", async (req, res) => {
  res.send(await req.db.collection("templates").find().toArray());
});

module.exports = router;
