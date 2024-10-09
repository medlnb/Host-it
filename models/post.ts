import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  price: {
    perday: { type: Number, required: true },
    permonth: { type: Number, required: true },
  },
  city: {
    type: Number,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  type: { type: String, required: true },
  resevedDates: [
    {
      firstDay: { type: String, required: true },
      lastDay: { type: String, required: true },
      reservedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
  reseveRequests: [
    {
      firstDay: { type: String, required: true },
      lastDay: { type: String, required: true },
      reservedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
  description: { type: String, required: true },
  amenities: { type: [String] },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  Bedrooms: { type: Number },
  Bathrooms: { type: Number },
  Guests: { type: Number },
  Beds: { type: Number },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
