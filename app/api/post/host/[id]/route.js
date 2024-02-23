import { connectToDatabase } from "@utils/database";

import Post from "@models/post";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const Posts = await Post.find({ poster: params.id }).select(
      "image title description state city"
    );
    return new Response(JSON.stringify(Posts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
