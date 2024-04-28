import { connectToDatabase } from "@utils/database";

import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: params.id }).select(
      "phonenumber governmentID address"
    );
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const patchedUser = await req.json();

    const user = await User.findOne({ _id: params.id });
    Object.entries(patchedUser).map((element) => {
      user[element[0]] = element[1];
    });
    await user.save();
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
