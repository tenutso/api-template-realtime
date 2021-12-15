//require("dotenv").config({ path: "../../.env" });
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://doadmin:E6PI43h091oN5Z7M@db-mongodb-tor1-77347-2d3642c8.mongo.ondigitalocean.com/appointific?authSource=admin&tls=true&tlsCAFile=../ca-certificate.crt"
);
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
