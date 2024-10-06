import { model, models, Schema } from "mongoose";

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = models.Message || model("Message", messageSchema);

export default Message;
