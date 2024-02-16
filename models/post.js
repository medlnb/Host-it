import { stat } from "fs";
import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  price: {
    type: {
      perday: Number,
      permonth: Number,
    },
    required: true,
  },
  location: {
    type: {
      city: String,
      state: String,
      lat: String,
      lng: String,
    },
    required: true,
  },
  type: { type: String, required: true },
  resevedDates: {
    type: [
      {
        type: {
          date: String,
          Duration: Number,
          reservedBy: { type: Schema.Types.ObjectId, ref: "User" },
        },
      },
    ],
  },
  reseveRequests: {
    type: [
      {
        type: {
          date: String,
          Duration: Number,
          reservedBy: { type: Schema.Types.ObjectId, ref: "User" },
        },
      },
    ],
  },
  description: { type: String },
  amenities: { type: [String] },
  image: { type: [String] },
  basics: {
    type: {
      Bedrooms: Number,
      Bathrooms: Number,
      Guests: Number,
      Beds: Number,
    },
  },
});

PostSchema.index({ "$**": "text" });

const Post = models.Post || model("Post", PostSchema);
export default Post;
