import User from "../models/User.js"; // Import User model

// Routes
export const saveUser = async (req, res) => {
  try {
    console.log("hello");
    console.log("req",req.body);
     const { clerkId, username, email, imageUrl } = req.body;


    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User already exists", user });
    }

    // Create new user
    user = new User({ username, email,clerkId,imageUrl });
    await user.save();

    res.status(201).json({ message: "User saved successfully", user });
  } catch (error) {
    console.error("❌ Error in saveUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};