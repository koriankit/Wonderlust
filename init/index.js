require("dotenv").config(); // ✅ Load environment variables
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL; // ✅ Use .env variable

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to MongoDB (Seed)");
}

main().then(initDB).catch(console.error);

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6805e65e3870c0d99778ee06", // example owner ID
    }));
    await Listing.insertMany(initData.data);
    console.log("✅ Data was initialized");
    process.exit(); // Exit after seeding
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
    process.exit(1);
  }
};
