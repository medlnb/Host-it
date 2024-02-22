import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { favorites } = await User.findById(params.id).select(
      "favorites -_id"
    );

    const Posts = await Post.find({ _id: { $in: favorites } }).select(
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
