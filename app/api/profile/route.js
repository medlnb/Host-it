import { connectToDatabase } from "@utils/database";

import User from "@models/user";


export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { Ids } = await req.json();
    const users = await User.find({ _id: { $in: Ids } }).select(
      "image name phonenumber email"
    );
    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
