require("dotenv").config({ path: "../../.env" });
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DATABASE_URL);
const csv = require("csvtojson");
const eventId = "dxS1qT1YIBZ5sjB95Q0k";
const csvFilePath = "./sessions_import_" + eventId + ".csv";

async function importSessions() {
  const jsonSessions = await csv().fromFile(csvFilePath);
  await client.connect();
  const db = await client.db();
  await db.collection("sessions").insertMany(jsonSessions);
  process.exit();
}

importSessions();
