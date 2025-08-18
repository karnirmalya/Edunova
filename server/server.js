import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());

// ✅ Webhook route needs raw body, so put it BEFORE express.json()
app.post(
  "/clerk/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// ✅ Normal routes can use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("API running"));
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

// Only connect once
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
});
