import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import Post from "@models/post";

export const PATCH = async (req) => {
  try {
    await connectToDatabase();
    const { userId, PostId } = await req.json();

    const user = await User.findById(userId, "favorites");

    if (!user.favorites.includes(PostId)) user.favorites.push(PostId);
    else user.favorites = user.favorites.filter((fav) => fav != PostId);

    await user.save();

    return new Response(JSON.stringify({ msg: "Added to favorite" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ err: "Server Error" }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { userId } = await req.json();

    const user = await User.findById(userId, "favorites");
    
    const favs = user.favorites;
    const posts = await Post.find({ _id: { $in: favs } });
    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ err: "Server Error" }), {
      status: 500,
    });
  }
};
