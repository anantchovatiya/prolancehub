import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { _id: false } // ✅ Prevents MongoDB from creating an `_id` for each review
);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  title: { type: String, default: "NA" },
  profileImage: { type: String, default: "/default-avatar.png" },
  bio: { type: String, default: "" },
  skills: {
    type: [String],
    default: ["NA"],
  },
  rating: { type: Number, default: 0 },
  portfolio: { type: String, default: "" },
  reviews: [ReviewSchema],
  rate: { type: String, default: "0" },
  ratings: [{type: Number}]
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
