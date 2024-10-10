import { model, models, Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const Review = models.Review || model("Review", reviewSchema);

export default Review;
