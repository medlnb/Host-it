import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  try {
    await connectToDatabase();

    const { filter, query } = await req.json();
    let Posts = null;
    if (filter === "") Posts = await Post.find();
    else
      Posts = await Post.find({
        $text: { $search: filter, $caseSensitive: false },
      });

    // dsanldnsd asd sad sa da
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

export const PATCH = async (req) => {
  try {
    await connectToDatabase();
    const { date, Duration, reservedBy, postId } = await req.json();

    const post = await Post.findById(postId);

    post.reseveRequests.push({ date, Duration, reservedBy });
    await post.save();

    return new Response(JSON.stringify({ msg: "Reserve request sent" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
