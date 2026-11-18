import mongoose from "mongoose";
import dns from "node:dns";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil");
  }
  try {
    await mongoose.connect(uri);
  } catch (err) {
    if (err.message && err.message.includes("querySrv")) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      await mongoose.connect(uri);
    } else {
      throw err;
    }
  }
  const { host, name } = mongoose.connection;
  const yer = uri.startsWith("mongodb+srv://")
    ? "Atlas" : "yerel";
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}
