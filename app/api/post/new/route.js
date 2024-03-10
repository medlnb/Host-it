import Post from "@models/post";
import { connectToDatabase } from "@utils/database";

export const POST = async (req, res) => {
  const {
    poster,
    title,
    type,
    price,
    location,
    Bedrooms,
    Bathrooms,
    Guests,
    city,
    state,
    Beds,
    description,
    amenities,
  } = await req.json();
  try {
    await connectToDatabase();
    const newPost = await Post.create({
      poster,
      title,
      type,
      price,
      location,
      Bedrooms,
      Bathrooms,
      Guests,
      city,
      state,
      Beds,
      resevedDates: [],
      description,
      amenities,
    });
    await newPost.save();
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

export const PATCH = async (req) => {
  const { post } = await req.json();
  console.log(post);
  try {
    await connectToDatabase();
    const newPost = await Post.findByIdAndUpdate(
      { _id: post._id },
      { ...post }
    );
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
