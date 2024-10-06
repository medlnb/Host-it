import Post from "@models/post";
import User from "@models/user";
import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
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
    const post = await req.json();
    const newPost = await Post.create({ poster: _id, ...post });

    return new Response(JSON.stringify({ PostId: newPost._id }), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  const { post } = await req.json();
  try {
    await connectToDatabase();
    const newPost = await Post.findByIdAndUpdate(post._id, { ...post });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
