import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String },
    favorites: { type: [String] },
    id: { type: String },
    phonenumber: { type: String },
    governmentID: { type: String },
    address: { type: String },
    plan: {
      type: {
        type: String,
        enum: ["Pro", "Premium"],
      },
      lastDay: String,
    },

    messages: {
      type: [
        {
          type: {
            from: { type: Schema.Types.ObjectId, ref: "User" },
            post: String,
            postId: String,
            content: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
