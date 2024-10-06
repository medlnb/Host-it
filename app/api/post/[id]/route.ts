import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import Cities from "@public/AlgerianCities.json";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const post = await Post.findOne({ _id: params.id }).populate(
      "poster",
      "name image email createdAt"
    );
    if (!post)
      return new Response(JSON.stringify({ err: "Post not found" }), {
        status: 404,
      });
    return new Response(
      JSON.stringify({ ...post._doc, state: Cities[post.state - 1][0].name }),
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const { content, userId, rating } = await req.json();
    const post = await Post.findOne({ _id: params.id });
    if (!post)
      return new Response(JSON.stringify({ err: "Post not found" }), {
        status: 404,
      });

    post.reviews.push({ content, userId, rating });
    await post.save();
    return new Response(JSON.stringify({ msg: "review added done" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
