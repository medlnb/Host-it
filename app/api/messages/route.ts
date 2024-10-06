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
    const { messages } = await User.findOne({
      email: session.user.email,
    }).select("messages -_id");
    return new Response(JSON.stringify({ messages, count: messages.length }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
