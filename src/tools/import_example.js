//require("dotenv").config({ path: "../../.env" });
const mongodb = require("../database.js");
const csv = require("csvtojson");
const eventId = "dxS1qT1YIBZ5sjB95Q0k";
const csvFilePath = "./sessions_import_" + eventId + ".csv";

async function importSessions() {
  const jsonSessions = await csv().fromFile(csvFilePath);
  const db = await mongodb();
  await db.collection("sessions").insertMany(jsonSessions);
  process.exit();
}

importSessions();
