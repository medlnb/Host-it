import { connectToDatabase } from "@utils/database";
import User from "@models/user";

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const { email, password, image, username } = await req.json();
    const exist = await User.findOne({ name: username, email });
    if (exist)
      return new Response(
        JSON.stringify({ err: "username or email already used" }),
        {
          status: 400,
        }
      );

    const newUser = await User.create({
      email,
      password,
      image,
      name: username,
      messages: [],
    });

    if (!newUser)
      return new Response(JSON.stringify({ err: "Error creating User" }), {
        status: 500,
      });

    return new Response(JSON.stringify(newUser), {
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
    const { userId, phonenumber, governmentID, address } = await req.json();
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        phonenumber,
        governmentID,
        address,
      }
    );

    if (!user)
      return new Response(JSON.stringify({ err: "Error updating User" }), {
        status: 500,
      });

    return new Response(
      JSON.stringify({
        phonenumber: user,
        governmentID: user.governmentID,
        address: user.address,
      }),
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
