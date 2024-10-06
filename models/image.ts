import { model, models, Schema } from "mongoose";

const imageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
});

const Image = models.Image || model("Image", imageSchema);

export default Image;
