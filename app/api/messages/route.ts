import Message from "@models/message";
import User from "@models/user";
import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    const { _id } = await User.findOne({ email: session.user.email }).select(
      "_id"
    );
    const count = await Message.countDocuments({ to: _id });

    const messages = await Message.find({ to: _id })
      .populate("post", "title")
      .populate("from", "phonenumber");
    return new Response(JSON.stringify({ messages, count }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();

    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }

    const { email } = session.user;
    const user = await User.findOne({ email }).select("_id");

    if (!user) {
      return new Response(JSON.stringify({ err: "User not found" }), {
        status: 404,
      });
    }

    const { messageId } = await req.json();
    const message = await Message.findOne({ _id: messageId });

    if (!message) {
      return new Response(JSON.stringify({ err: "Message not found" }), {
        status: 404,
      });
    }

    if (message.to.toString() !== user._id.toString()) {
      return new Response(JSON.stringify({ err: "Unauthorized" }), {
        status: 401,
      });
    }

    await Message.deleteOne({ _id: messageId });

    return new Response(
      JSON.stringify({ msg: "Message deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
