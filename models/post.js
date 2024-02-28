import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  poster: { type: String, required: true },
  title: { type: String, required: true },
  price: {
    type: {
      perday: Number,
      permonth: Number,
    },
    required: true,
  },
  city: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    type: {
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
          dateEnd: String,
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
          dateEnd: String,
          Duration: Number,
          reservedBy: { type: Schema.Types.ObjectId, ref: "User" },
        },
      },
    ],
  },
  reviews: {
    type: [
      {
        type: {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          rating: Number,
          content: String,
        },
      },
    ],
  },
  description: { type: String },
  amenities: { type: [String] },
  image: { type: [String] },
  Bedrooms: { type: Number },
  Bathrooms: { type: Number },
  Guests: { type: Number },
  Beds: { type: Number },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
