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
      JSON.stringify({
        post,
        state: Cities[post.state - 1][0].name,
      }),
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
