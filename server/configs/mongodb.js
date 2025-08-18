import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ MongoDB connected successfully")
    );

    mongoose.connection.on("error", (err) =>
      console.error("❌ MongoDB connection error:", err)
    );

    await mongoose.connect("mongodb+srv://NirmalyaKar:Edunova2025@cluster0.vv5vei6.mongodb.net/edunova", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
