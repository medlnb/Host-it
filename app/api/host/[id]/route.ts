import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  try {
    await connectToDatabase();
    const post = await Post.findById(params.id).select(
      "images title type description state city location price Bedrooms Bathrooms Guests Beds amenities"
    );
    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
