import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import Image from "@models/image";
import User from "@models/user";

export const POST = async (req: NextRequest) => {
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
    const { image } = await req.json();
    const imageDb = await Image.create({ image, owner: _id });
    return new Response(JSON.stringify({ ...imageDb._doc }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 501 });
  }
};
