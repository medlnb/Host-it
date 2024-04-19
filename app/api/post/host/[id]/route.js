import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import Post from "@models/post";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const Posts = await Post.find({ poster: params.id }).select(
      "image title type description state city location price Bedrooms Bathrooms Guests Beds amenities"
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

    const post = await Post.findById(
      params.id,
      "resevedDates reseveRequests poster title"
    );

    const newreserved = post.reseveRequests.find(
      (element) => element._id.toString() === RequestId
    );
    const treserverId = newreserved.reservedBy.toString();
    post.reseveRequests = post.reseveRequests.filter(
      (element) => element._id.toString() !== RequestId
    );

    const user = await User.findById(treserverId).select("messages");

    user.messages.push({
      from: post.poster,
      post: post.title,
      content: `your request has been accepted in "${post.title}"`,
      postId: post._id,
    });
    post.resevedDates.push(newreserved);

    await user.save();
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
