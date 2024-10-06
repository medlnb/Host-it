import User from "@models/user";
import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

interface Message {
  _id: string;
  from: string;
  postId: string;
  post: string;
  content: string;
}

export const DELETE = async (
  req: NextRequest,
  { params: { userid } }: { params: { userid: string } }
) => {
  try {
    await connectToDatabase();
    const { messageId } = await req.json();

    const user = await User.findById(userid).select("messages");

    const newMessages = user.messages.filter(
      (message: Message) => message._id.toString() !== messageId
    );
    user.messages = newMessages.map((message: Message) => ({
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
