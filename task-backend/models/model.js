import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  pass: String
});

export default mongoose.model("User", userSchema);
