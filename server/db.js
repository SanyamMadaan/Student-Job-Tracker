const mongoose = require("mongoose");
require('dotenv').config();
const DB = process.env.DB_URL;

function ConnectDatabase() {
  try {
    mongoose.connect(DB)
    .then(()=>console.log('Database connected successfully'));
  } catch (err) {
    console.log("Error while connecting to database");
    console.log(err);
  }
}

ConnectDatabase()