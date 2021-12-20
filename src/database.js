module.exports = async () => {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  return client.db();
};
