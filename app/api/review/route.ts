import Review from "@models/review";
import User from "@models/user";
import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { PiPhonePlusBold } from "react-icons/pi";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const SearchParams = new URLSearchParams(url.searchParams);
    const postId = SearchParams.get("postId");
    const reviews = await Review.find({ post: postId }).populate(
      "user",
      "name image"
    );
    console.log(reviews);
    return new Response(JSON.stringify(reviews), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session)
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });

    const { _id } = await User.findOne({ email: session.user.email }).select(
      "_id"
    );
    const { content, stars, post } = await req.json();

    const review = await Review.create({
      user: _id,
      post,
      content,
      stars,
    });

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
