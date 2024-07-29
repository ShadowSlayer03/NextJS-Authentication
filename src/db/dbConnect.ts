import mongoose from "mongoose";

async function dbConnect() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (mongoURI) {
      await mongoose.connect(mongoURI);

      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("Database Connected Successfully!");
      });
    } else {
      console.error("Database ENV variable undefined.");
    }
  } catch (error) {
    console.log("Error Connecting to the Database:", error);
  }
}

export default dbConnect;
