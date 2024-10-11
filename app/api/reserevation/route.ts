import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import Cities from "@public/AlgerianCities.json";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import User from "@models/user";
import Message from "@models/message";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const SearchParams = new URLSearchParams(url.searchParams);
    const postId = SearchParams.get("postId");

    if (!postId)
      return new Response(JSON.stringify({ err: "Post not found" }), {
        status: 404,
      });

    const post = await Post.findById(postId)
      .populate("reseveRequests.reservedBy", "name image email createdAt")
      .populate("resevedDates.reservedBy", "name image email createdAt");

    if (!post)
      return new Response(JSON.stringify({ err: "Post not found" }), {
        status: 404,
      });
    return new Response(
      JSON.stringify({ ...post._doc, state: Cities[post.state - 1][0].name }),
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

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session)
      return new Response(
        JSON.stringify({ err: "You need to be logged in to reserve" }),
        {
          status: 401,
        }
      );
    const url = new URL(req.url);
    const SearchParams = new URLSearchParams(url.searchParams);
    const postId = SearchParams.get("postId");
    if (!postId)
      return new Response(JSON.stringify({ err: "Post not found" }), {
        status: 404,
      });

    const { firstDay, lastDay } = await req.json();
    const { _id } = await User.findOne({ email: session.user.email }).select(
      "_id"
    );
    const post = await Post.findById(postId);

    post.reseveRequests.push({ firstDay, lastDay, reservedBy: _id });

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

export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session)
      return new Response(
        JSON.stringify({ err: "You need to be logged in to reserve" }),
        {
          status: 401,
        }
      );
    const { _id } = await User.findOne({ email: session.user.email }).select(
      "_id"
    );
    const { RequestId, postId, type } = await req.json();

    const post = await Post.findById(postId).select(
      "resevedDates reseveRequests poster title"
    );

    if (post.poster.toString() !== _id.toString())
      return new Response(JSON.stringify({ msg: "identify ur self u mf" }), {
        status: 401,
      });

    const newreserved = post.reseveRequests.find(
      (element: { _id: string }) => element._id.toString() === RequestId
    );
    const treserverId = newreserved.reservedBy.toString();
    post.reseveRequests = post.reseveRequests.filter(
      (element: { _id: string }) => element._id.toString() !== RequestId
    );

    const message = await Message.create({
      from: _id,
      to: treserverId,
      post: post._id,
      content: `your request has been ${
        type === "accept" ? "accepted" : "rejected"
      } in "${post.title}"`,
    });

    if (type === "accept") post.resevedDates.push(newreserved);

    await post.save();
    return new Response(JSON.stringify({ msg: "reseved seccufully" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
