const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.URI_DB;

const dbConnect = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("error", () => {
  console.log(`Mongoose error`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Conection with DB is closed and App is terminated");
    process.exit(1);
  });
});

module.exports = dbConnect;
