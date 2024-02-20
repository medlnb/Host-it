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
    const HighPricedta = HighPrice || 10000;
    const LowPricedta = LowPrice || 100;
    const bedroomsdta = bedrooms || 0;
    const bathroomsdta = bathrooms || 0;
    const bedsdta = beds || 0;
    const serchamenties = amenties.split(",") || amentiesdta;
    const searchquerry = query || "";
    const searchfilter = type || types;

    let querry = Post.find({
      title: { $regex: searchquerry, $options: "i" },
    });

    if (wilaya) {
      console.log(wilaya.split("\\")[1].substring(1));
      querry = querry.where("state").equals("Biskra");
    }

    if (baladia) {
      querry = querry.where("city").equals(baladia.split("\\")[1].substring(1));
    }

    querry = querry
      .where("type")
      .equals(searchfilter)
      .where("Bedrooms")
      .gte(bedroomsdta)
      .where("Bathrooms")
      .gte(bathroomsdta)
      .where("Beds")
      .gte(bedsdta)
      .where("price.perday")
      .gte(Number(LowPricedta))
      .where("price.perday")
      .lte(Number(HighPricedta));

    if (serchamenties) {
      querry = querry.where("amenties").in(serchamenties);
    }

    const Posts = await querry;

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
