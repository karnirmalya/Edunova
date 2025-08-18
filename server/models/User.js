import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: false, unique: true }, // Clerk user ID
  name: String,
  email: { type: String, required: true, unique: true },
  imageUrl: String,
  enrolledCourse:[ {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Course",
   
  }],

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
