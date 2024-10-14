import { connectToDatabase } from "@utils/database";
import cities from "@public/AlgerianCities.json";
import User from "@models/user";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import Post from "@models/post";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    const { _id } = await User.findOne({ email: session.user.email });
    const Posts = await Post.find({ poster: _id }).select(
      "images title state city"
    );

    const withCitiesName = Posts.map((post) => ({
      ...post._doc,
      state: cities[post.state - 1][0].name,
      city: cities[post.state - 1][post.city].name,
    }));

    return new Response(JSON.stringify(withCitiesName), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
