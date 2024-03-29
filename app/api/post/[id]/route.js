import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const post = await Post.findOne({ _id: params.id });
    if (!post)
      return new Response(JSON.stringify({ err: "Post not found" }), {
        status: 404,
      });
    const poster = await User.findById(post.poster).select(
      "email name image createdAt"
    );
    return new Response(JSON.stringify({ post, poster }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
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
