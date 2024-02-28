import User from "@models/user";
import { connectToDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { messages } = await User.findById(params.userid).select(
      "messages -_id"
    );
    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { messageId } = await req.json();

    const user = await User.findById(params.userid).select("messages");

    const newMessages = user.messages.filter(
      (message) => message._id.toString() !== messageId
    );
    user.messages = newMessages.map((message) => ({
      from: message.from,
      post: message.post,
      content: message.content,
    }));
    await user.save();

    return new Response(JSON.stringify({ msg: "done" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
