import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify Clerk signature
    const payload = await whook.verify(req.body.toString("utf8"), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = payload;

    switch (type) {
      case "user.created":
        await User.create({
          clerkId: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        });
        break;

      case "user.updated":
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            email: data.email_addresses[0].email_address,
            imageUrl: data.image_url,
          }
        );
        break;

      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;

      default:
        console.log(`Unhandled event: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ error: err.message });
  }
};
