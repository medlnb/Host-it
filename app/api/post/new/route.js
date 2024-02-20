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
    image,
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
      image,
    });
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
