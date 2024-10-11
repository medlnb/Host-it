import { connectToDatabase } from "@utils/database";
import { NextRequest } from "next/server";
import User from "@models/user";
import { getServerSession } from "next-auth";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email }).select(
      "phonenumber governmentID address name email"
    );
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ Error: "Unauthorized" }), {
        status: 401,
      });
    }
    const profileUpdates = await req.json();

    const user = await User.findOneAndUpdate(
      {
        email: session.user.email,
      },
      { ...profileUpdates }
    );

    return new Response(JSON.stringify({ msg: "Done" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
