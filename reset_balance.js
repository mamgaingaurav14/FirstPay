const mongoose = require("mongoose");
const {Account } = require("./db");

const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function resetBalances() {
  try {
    await mongoose.connect(MONGO_URI);
    await Account.updateMany({}, { $set: { balance: 10000 } });
    console.log("All balances reset to 10000");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error resetting balances:", err);
    mongoose.connection.close();
  }
}

resetBalances();
