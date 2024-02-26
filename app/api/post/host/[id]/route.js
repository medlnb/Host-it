import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const Posts = await Post.find({ poster: params.id }).select(
      "image title description state city"
    );
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

export const POST = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { RequestId } = await req.json();

    const post = await Post.findById(params.id, "resevedDates reseveRequests");

    const newreserved = post.reseveRequests.find(
      (element) => element._id.toString() === RequestId
    );
    post.reseveRequests = post.reseveRequests.filter(
      (element) => element._id.toString() !== RequestId
    );

    post.resevedDates.push(newreserved);
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
