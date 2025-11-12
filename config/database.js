const mongoose = require("mongoose")

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOLINK);
    console.log("✅ Connect Success");
    console.log("📂 Database name:", mongoose.connection.name);
  } catch (error) {
    console.log("❌ Connect Error:", error);
  }
}
