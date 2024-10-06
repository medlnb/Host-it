import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import Image from "@models/image";
import User from "@models/user";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    connectToDatabase();
    const imageId = params.id;
    const image = await Image.findById(imageId);
    return new Response(JSON.stringify({ ...image._doc }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ err }), { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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
    const imageId = params.id;
    const imageDb = await Image.findById(imageId);
    if (imageDb.owner.toString() !== _id.toString()) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    await Image.findByIdAndDelete(imageId);
    return new Response(JSON.stringify({ msg: "Done" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 501 });
  }
};
