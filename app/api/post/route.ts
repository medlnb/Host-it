import { connectToDatabase } from "@utils/database";
import Post from "@models/post";
import { NextRequest } from "next/server";
import User from "@models/user";
import { getServerSession } from "next-auth";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const SearchParams = new URLSearchParams(url.searchParams);
    const p = Number(SearchParams.get("p") ?? 1);
    const type = SearchParams.get("type");
    const bedrooms = SearchParams.get("bedrooms");
    const bathrooms = SearchParams.get("bathrooms");
    const beds = SearchParams.get("beds");
    const HighPrice = SearchParams.get("HighPrice");
    const LowPrice = SearchParams.get("LowPrice");
    const amenties = SearchParams.get("amenties");
    const wilaya = SearchParams.get("wilaya");
    const baladia = SearchParams.get("baladia");

    let query = {};

    if (type) {
      query = {
        ...query,
        type,
      };
    }

    if (bedrooms) {
      query = {
        ...query,
        Bedrooms: { $gte: Number(bedrooms) },
      };
    }
    if (bathrooms) {
      query = {
        ...query,
        Bathrooms: { $gte: Number(bathrooms) },
      };
    }
    if (beds) {
      query = {
        ...query,
        Beds: { $gte: Number(beds) },
      };
    }
    if (HighPrice) {
      query = {
        ...query,
        "price.perday": { $lte: Number(HighPrice) },
      };
    }
    if (LowPrice) {
      query = {
        ...query,
        "price.perday": { $gte: Number(LowPrice) },
      };
    }
    if (amenties) {
      query = {
        ...query,
        amenities: { $all: amenties.split(",") },
      };
    }
    if (wilaya) {
      query = {
        ...query,
        state: wilaya,
      };
    }
    if (baladia) {
      query = {
        ...query,
        city: baladia,
      };
    }

    const docusCount = await Post.countDocuments(query);
    const postsPerPage = 6;

    const count = Math.ceil(docusCount / postsPerPage);
    const Posts = await Post.find({ ...query })
      .skip((p - 1) * postsPerPage)
      .limit(postsPerPage);

    return new Response(JSON.stringify({ Posts, count }), {
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
    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    const { _id } = await User.findOne({ email: session.user.email }).select(
      "_id"
    );
    const post = await req.json();
    const newPost = await Post.create({ poster: _id, ...post });

    return new Response(JSON.stringify({ PostId: newPost._id }), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  const inputPost = await req.json();
  try {
    await connectToDatabase();
    const session = await getServerSession();
    if (!session) {
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });
    }
    const { _id } = await User.findOne({ email: session.user.email }).select(
      "_id"
    );
    const post = await Post.findById(inputPost._id).select("poster");
    if (post.poster.toString() !== _id.toString())
      return new Response(JSON.stringify({ msg: "Unauthorized" }), {
        status: 401,
      });

    const newPost = await Post.findByIdAndUpdate(post._id, { ...post });
    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
