import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  try {
    await connectToDatabase();

    const types = [
      "Villa",
      "Apartment",
      "House",
      "Campervan",
      "Land",
      "Office",
      "Shop",
      "Garage",
      "Warehouse",
      "Studio",
      "Hotel",
      "Motel",
    ];
    const amentiesdta = [
      "Wifi",
      "TV",
      "Kitchen",
      "Washer",
      "Parking",
      "Air conditioning",
      "Heater",
      "Pool",
      "Elevator",
    ];
    const {
      query,
      type,
      wilaya,
      baladia,
      bedrooms,
      bathrooms,
      beds,
      amenties,
      HighPrice,
      LowPrice,
    } = await req.json();
    const serchamenties = amenties.split(",") || amentiesdta;
    const searchquerry = query || "";
    const searchfilter = type || types;

    const Posts = await Post.find({
      title: { $regex: searchquerry, $options: "i" },
    })
      .where("type")
      .equals(searchfilter);

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
