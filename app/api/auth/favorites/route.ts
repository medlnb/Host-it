import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import Post from "@models/post";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    const url = new URL(req.url);
    const SearchParams = new URLSearchParams(url.searchParams);
    const onlyids = SearchParams.get("onlyids");
    //this is a special case where we only want the ids of the favorites for favs context
    if (onlyids) {
      const { favorites } = await User.findOne({
        email: session.user.email,
      }).select("favorites");
      return new Response(JSON.stringify(favorites), {
        status: 200,
      });
    }

    const { favorites } = await User.findOne({
      email: session.user.email,
    })
      .select("favorites")
      .populate("favorites", "title images");

    return new Response(JSON.stringify(favorites), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    const { PostId } = await req.json();

    let type = "Add";
    const user = await User.findOne({ email: session.user.email }).select(
      "favorites"
    );

    if (!user.favorites.includes(PostId)) user.favorites.push(PostId);
    else {
      user.favorites = user.favorites.filter((fav: string) => fav != PostId);
      type = "Remove";
    }

    await user.save();

    return new Response(JSON.stringify({ type }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ err: "Server Error" }), {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
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
