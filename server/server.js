import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhook.js";

const app = express();
app.use(cors());

// Middleware to get raw body for Clerk
app.use(
  "/clerk/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
app.post('/clerk', clerkWebhooks);

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
});
